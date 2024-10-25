import { and, eq } from "drizzle-orm";

import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { databaseClient } from "../config/database";
import { ServerError } from "../error/server.error";
import { isEmpty } from "../utils/helpers";
import { MenuSchema, NewMenuSchema, menus } from "../schema/menu";
import { MenuCategorySchema } from "../schema/menu-category";
import { MenuItemSchema } from "../schema/menu-item";


type RestaurantMenu = MenuSchema & {
    menuCategories: MenuCategorySchema[]
}

export interface MenuRepository extends Repository<NewMenuSchema, MenuSchema> {
    getOne(payload: { id: string; restaurantId: string }): Promise<MenuSchema | null>;
    getRestaurantMenus(restaurantId: string): Promise<RestaurantMenu[] | null>
}

export default class MenuRepositoryImpl implements MenuRepository {
    private readonly database = databaseClient;
    private readonly table = menus;
    
    public async create(payload: NewMenuSchema): Promise<MenuSchema> {
        try {     
            console.log({ payload })
            const result = await this.database.insert(this.table).values(payload).returning();
    
            if (isEmpty(result)) throw new ServerError("Failed to create menu");
    
            return result[0];
        } catch (error) { 
            throw new ServerError(
                "Failed to create menu",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async deleteOne(payload: { id: string; }): Promise<void> {
        try {
            await this.database.delete(this.table).where(eq(this.table.id, payload.id));
        } catch (error) {
            throw new ServerError(
                "Failed to delete menu",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async getOne(payload: { id: string; restaurantId: string }): Promise<MenuSchema> {
        try {
            const result = await this.database.select()
                .from(this.table)
                .where(and(
                    eq(this.table.id, payload.id),
                    eq(this.table.restaurantId, payload.restaurantId)
                ));

            if (isEmpty(result)) throw new Error("Not found");
            
            return result[0];
        } catch (error) {
            throw new ServerError(
                "Failed to retrieve category",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async getMany(pagination: PaginatedRepositoryParams, id: string): Promise<MenuSchema[]> {
        const {page, limit} = pagination;
        try {
            const offset = (page - 1) * limit;
            
            const result = await this.database.query.menus
                .findMany({ 
                    limit: limit, 
                    offset, 
                    where: eq(this.table.restaurantId, id)
                });

            return result;
        } catch (error) { 
            throw new ServerError(
                "Failed to retrieve menu",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async getRestaurantMenus(restaurantId: string): Promise<RestaurantMenu[]> {
        try {
            console.log({ restaurantId })
            const result = await this.database.query.menus
                .findMany({ 
                    where: eq(this.table.restaurantId, restaurantId),
                    with: {
                        menuCategories: {
                            with: {
                                menuItems: true
                            }
                        }
                    }
                });

            return result;
        } catch (error) { 
            throw new ServerError(
                "Failed to retrieve menu",
                error instanceof Error ? error.message : null
            );
        }
    }

    update(id: string, payload: NewMenuSchema): Promise<MenuSchema> {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<MenuSchema> {
        throw new Error("Method not implemented.")
    }


    findOne?(paylaod: { name: string; }): Promise<MenuSchema> {
        throw new Error("Method not implemented.");
    }

}
