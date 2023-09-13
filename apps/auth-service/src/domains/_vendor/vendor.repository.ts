import { and, eq, sql, or } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";
import { drizzle } from "drizzle-orm/node-postgres";
import { NewUserSchema, UserSchema, users } from "./vendor.schema";
import { dbClient } from "../../config/db/client";
import { DatabaseInterface } from "ubereats-types";
import { NewCustomerSchema, customers } from "../customer/customer.schema";
import { PasswordService } from "../../services/password/password.service";

function isEmpty<T extends any[]>(arg: T): boolean {
    if (arg.length !== 0) return false;

    return true;
}

export interface UserDatabaseInterface<E> extends DatabaseInterface<E> {
    createCustomerWithUser(
        customer: NewCustomerSchema, 
    ): Promise<any>
}

export class UserRepository implements UserDatabaseInterface<UserSchema> {
    private readonly db: ReturnType<typeof drizzle> =  drizzle(dbClient);
    private readonly entity: typeof users = users;
    private readonly customer = customers;
    // private readonly vendor = vendors;

    constructor(private readonly passwordService: PasswordService) {}

    async create(payload: NewUserSchema): Promise<UserSchema> {
        const result = await this.db
            .insert(this.entity)
            .values({...payload, id: uuid4()})
            .returning();

        return result[0];
    }

    async createCustomerWithUser(customerPayload: NewCustomerSchema) {
        const newCustomerResult = await this.db.transaction(async (tx) => {
            const {
                deliveryAddress,
                userId,
                customerId,
                password,
                ...newUserPayload
            } = customerPayload;

            const hashedPassword = await this.passwordService.encrypt(password);
            const newUser = await this.create({
                id: uuid4(), 
                password: hashedPassword,
                ...newUserPayload
            });

            const newCustomer = await tx.insert(this.customer).values({
                ...customerPayload,
                password: hashedPassword,
                customerId: uuid4(),
                userId: newUser.id
            })
            .returning({
                firstname: this.customer.firstname,
                lastname: this.customer.lastname,
                customerId: this.customer.customerId,
                phone: this.customer.phone,
                email: this.customer.email,
                userId: this.customer.userId
            })

            return newCustomer;
        });

        return newCustomerResult[0];
    }

    async getById(id: string): Promise<UserSchema | null> {
        const data = await this.db
            .select()
            .from(this.entity)
            .where(eq(this.entity.id, id));


        return isEmpty(data) ? null : data[0];
    }

    async getOne(payload: UserSchema["email"] | UserSchema["phone"]): Promise<UserSchema | null> {
        const data = await this.db
            .select()
            .from(this.entity)
            .where(or(
                eq(this.entity.phone, payload),
                eq(this.entity.email, payload)
            ));


        return isEmpty(data) ? null : data[0];
    }

    async getMany(limit: number, page: number): Promise<UserSchema[] | null> {
        const offset = (page - 1) * limit;

        const paginatedMenuItems = await this.db.select()
            .from(this.entity)
            .limit(limit)
            .offset(offset)

        return isEmpty(paginatedMenuItems) ? null : paginatedMenuItems;
    }
    
    async count(): Promise<number> {
        const restaurantCount = await this.db
                .select({ count: sql<number>`count(*)` })
                .from(this.entity);

        return restaurantCount[0].count;
    } 

    async delete(id: string) {
        await this.db.delete(this.entity).where(eq(this.entity.id, id));
    }

    async update(id: string, payload: UserSchema): Promise<UserSchema | null> {
        const existingUser = await this.getById(id);

        if (!existingUser) {
            throw new Error("Invalid ID");
        }

        const updatedUser = await this.db.update(this.entity)
            .set({ 
                firstname: payload.firstname || existingUser.firstname,
                lastname: payload.lastname || existingUser.lastname,
                email: payload.email || existingUser.email,
                phone: payload.phone || existingUser.phone
            })
            .where(eq(this.entity.id, id))
            .returning();
        
        return isEmpty(updatedUser) ? null : updatedUser[0];
    }
}