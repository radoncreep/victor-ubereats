import { Location } from "ubereats-types";
import { eq } from "drizzle-orm";

import { RestaurantAddress, OpeningHours } from "../entities/restaurant";
import { NewCategoryEntity, CategoryEntity, categories } from "../schema/categories";
import { DbImage } from "../schema/restaurant";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { databaseClient } from "../config/database";
import { isEmpty } from "../utils/helpers";
import { ServerError } from "../error/server.error";


export class CategoryRepository implements Repository<NewCategoryEntity, CategoryEntity> {
    
    private readonly database = databaseClient;
    private readonly table = categories;

    async create(payload: NewCategoryEntity): Promise<CategoryEntity> {
        console.log({ payload })
        try {     
            const result = await this.database.insert(this.table).values(payload).returning();
    
            if (isEmpty(result)) throw new ServerError("Failed to create category");
    
            return result[0];
        } catch (error) {
            throw new ServerError(
                "Failed to create category",
                error instanceof Error ? error.message : null
            );
        }
    }
    
    async deleteOne(payload: { id: string; }): Promise<void> {
        try {
            await this.database.delete(this.table).where(eq(this.table.id, payload.id));
        } catch (error) {
            throw new ServerError(
                "Failed to delete category",
                error instanceof Error ? error.message : null
            );
        }
    }

    async getOne(payload: { id: string; }): Promise<{ id: string; name: string; }> {
        try {
            const result = await this.database.select()
                .from(this.table)
                .where(eq(this.table.id, payload.id));

            if (isEmpty(result)) throw new Error("Not found");
            
            return result[0];
        } catch (error) {
            throw new ServerError(
                "Failed to retrieve category",
                error instanceof Error ? error.message : null
            );
        }
    }

    getMany(pagination: PaginatedRepositoryParams): Promise<{ id: string; name: string; }[]> {
        throw new Error("Method not implemented.");
    }

    update(payload: { name: string; id?: string; }): Promise<{ id: string; name: string; }> {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<{ id: string; name: string; }> {
        throw new Error("Method not implemented.");
    }
   
    async findOne(paylaod: { name: string }): Promise<CategoryEntity | null> {
        console.log({ name: paylaod.name })
        const result = await this.database.select()
            .from(this.table).where(eq(this.table.name, paylaod.name));

        console.log({ categories: result })
        return isEmpty(result) ? null : result[0];
    }
}