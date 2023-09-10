import { and, eq, sql } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";
import { drizzle } from "drizzle-orm/node-postgres";
import { NewUserSchema, UserSchema, users } from "./user.schema";
import { dbClient } from "../../config/db/client";
import { DatabaseInterface } from "ubereats-types";

function isEmpty<T extends any[]>(arg: T): boolean {
    if (arg.length !== 0) return false;

    return true;
}

export class UserRepository implements DatabaseInterface<UserSchema> {
    private readonly db: ReturnType<typeof drizzle> =  drizzle(dbClient);
    private readonly entity: typeof users = users;

    constructor() {}

    async create(payload: NewUserSchema): Promise<UserSchema> {
        const result = await this.db
            .insert(this.entity)
            .values({...payload, id: uuid4()})
            .returning();

        return result[0];
    }

    async getById(id: string): Promise<UserSchema | null> {
        const data = await this.db
            .select()
            .from(this.entity)
            .where(eq(this.entity.id, id));


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