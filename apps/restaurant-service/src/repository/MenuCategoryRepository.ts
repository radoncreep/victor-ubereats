import { and, eq } from "drizzle-orm";

import { type NewMenuCategorySchema, type MenuCategorySchema, menuCategories } from "../schema/menu-category";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { databaseClient } from "../config/database";
import { ServerError } from "../error/server.error";
import { isEmpty } from "../utils/helpers";


export interface MenuCategoryRepository extends Repository<NewMenuCategorySchema, MenuCategorySchema> {}

export default class MenuCategoryRepositoryImpl implements MenuCategoryRepository {
    private readonly database = databaseClient;
    private readonly table = menuCategories;
    
    public async create(payload: NewMenuCategorySchema): Promise<MenuCategorySchema> {
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

    public async deleteOne(payload: { id: string; }): Promise<void> {
        try {
            await this.database.delete(this.table).where(eq(this.table.id, payload.id));
        } catch (error) {
            throw new ServerError(
                "Failed to delete category",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async getOne(payload: { id: string; restaurantId: string }): Promise<MenuCategorySchema> {
        try {
            const result = await this.database.select()
                .from(this.table)
                .where(
                    and(
                        eq(this.table.id, payload.id),
                        eq(this.table.restaurantId, payload.restaurantId)
                    )
                );

            if (isEmpty(result)) throw new Error("Not found");
            
            return result[0];
        } catch (error) {
            throw new ServerError(
                "Failed to retrieve category",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async getMany(pagination: PaginatedRepositoryParams, id: string): Promise<MenuCategorySchema[]> {
        const {page, limit} = pagination;
        try {
            const offset = (page - 1) * limit;
            
            const result = await this.database.query.menuCategories
                .findMany({ 
                    limit: limit, 
                    offset, 
                    where: eq(this.table.restaurantId, id)
                });

            return result;
        } catch (error) { 
            throw new ServerError(
                "Failed to retrieve category",
                error instanceof Error ? error.message : null
            );
        }
    }

    update(id: string, payload: NewMenuCategorySchema): Promise<MenuCategorySchema> {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<MenuCategorySchema> {
        throw new Error("Method not implemented.")
    }


    findOne?(paylaod: { name: string; }): Promise<MenuCategorySchema> {
        throw new Error("Method not implemented.");
    }

}
