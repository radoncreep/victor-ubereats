import { eq, sql, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { DatabaseInterface } from "ubereats-types";

import { dbClient } from "../../config/db/client";
import { CustomerSchema, NewCustomerSchema, customers } from "../customer/customer.schema";


function isEmpty<T extends any[]>(arg: T): boolean {
    if (arg.length !== 0) return false;

    return true;
}
   

export class CustomerRepository implements DatabaseInterface<CustomerSchema> {
    private readonly db: ReturnType<typeof drizzle> =  drizzle(dbClient);
    private readonly entity = customers;

    constructor() {}

    async create(payload: NewCustomerSchema): Promise<CustomerSchema> {

        const result = await this.db
            .insert(this.entity)
            .values(payload)
            .returning();

        return result[0];
    }

    async getById(id: string): Promise<CustomerSchema | null> {
        const data = await this.db
            .select()
            .from(this.entity)
            .where(eq(this.entity.customerId, id));


        return isEmpty(data) ? null : data[0];
    }

    async getOne(payload: CustomerSchema["email"] | CustomerSchema["phone"]): Promise<CustomerSchema | null> {
        const data = await this.db
            .select()
            .from(this.entity)
            .where(or(
                eq(this.entity.phone, payload),
                eq(this.entity.email, payload)
            ));

        return isEmpty(data) ? null : data[0];
    }

    async getMany(limit: number, page: number): Promise<CustomerSchema[] | null> {
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
        await this.db.delete(this.entity).where(eq(this.entity.customerId, id));
    }

    async update(id: string, payload: NewCustomerSchema): Promise<CustomerSchema | null> {
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
            .where(eq(this.entity.customerId, id))
            .returning();
        
        return isEmpty(updatedUser) ? null : updatedUser[0];
    }
}