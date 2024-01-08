import { eq } from "drizzle-orm";

import { NewCategoryEntity, CategoryEntity, categories } from "../schema/categories";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { databaseClient } from "../config/database";
import { isEmpty } from "../utils/helpers";
import { ServerError } from "../error/server.error";


export interface CategoryRepository extends Repository<NewCategoryEntity, CategoryEntity>  {
    getManyWithRestaurants(pagination: PaginatedRepositoryParams): Promise<CategoryEntity[]>;
}

class CategoryRepositoryImpl implements CategoryRepository {
    
    private readonly database = databaseClient;
    private readonly table = categories;

    async create(payload: NewCategoryEntity): Promise<CategoryEntity> {
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

    async getManyWithRestaurants(pagination: PaginatedRepositoryParams): Promise<CategoryEntity[]> {
        const {page, limit} = pagination;
        try {
            const offset = (page - 1) * limit;
            
            const result = await this.database.query.categories
                .findMany({ 
                    limit: limit, 
                    offset, 
                    with: {
                        restaurants: {
                            columns: {
                                id: true,
                                name: true,
                                mainImage: true,
                                opening_hours: true,
                                rating: true,
                                location: true
                            }
                        }
                    }
                });

            console.log({ result })
            return result;
        } catch (error) { 
            console.log("here ", {error});
            throw new ServerError(
                "Failed to retrieve category",
                error instanceof Error ? error.message : null
            );
        }
    }

    async getMany(pagination: PaginatedRepositoryParams): Promise<CategoryEntity[]> {
        throw new Error()
    }

    update(payload: { name: string; id?: string; }): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<CategoryEntity> {
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

export const categoryRepository = new CategoryRepositoryImpl();