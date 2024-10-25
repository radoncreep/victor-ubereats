import { inArray, eq, sql } from "drizzle-orm";

import { NewMenuItemSchema, menuitems } from "../schema/menu-item";
import { MenuItem } from "../types";
import { databaseClient } from "../config/database";
import { isEmpty } from "../utils/helpers";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { ServerError } from "../error/server.error";


export interface MenuItemRepository extends Repository<NewMenuItemSchema, MenuItem> {
    findManyByIds(ids: string[]): Promise<MenuItem[] | null>;
    count(): Promise<number>;
}

export class MenuItemRepositoryImpl implements MenuItemRepository  {
    private readonly db = databaseClient;
    private readonly entity = menuitems;

    constructor() {}
    deleteOne(payload: { id: string; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getOne(payload: { id: string; }): Promise<MenuItem> {
        throw new Error("Method not implemented.");
    }
    findOne?(paylaod: { name: string; }): Promise<MenuItem> {
        throw new Error("Method not implemented.");
    }

    async create(payload: NewMenuItemSchema): Promise<MenuItem> {
        const result = await this.db
            .insert(this.entity)
            .values(payload)
            .returning();

        return result[0];
    }

    async getById(id: string): Promise<MenuItem | null> {
        try {
            const data = await this.db
                .select()
                .from(this.entity)
                .where(eq(this.entity.id, id));
    
            return isEmpty(data) ? null : data[0];
        } catch (error) {
            console.log("menu item ", error)
            throw error;
        }
    }

    async getMany(pagination: PaginatedRepositoryParams, id: string): Promise<MenuItem[] | null> {
        const {page, limit} = pagination;
        const offset = (page - 1) * limit;

        const paginatedMenuItems = await this.db.select()
            .from(this.entity)
            .limit(limit)
            .offset(offset)
            .where(eq(this.entity.restaurantId, id));

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

    async update(id: string, payload: MenuItem): Promise<MenuItem | null> {
        const existingMenuItem = await this.getById(id);

        if (!existingMenuItem) {
            throw new Error("Invalid ID");
        }

        const updatedRestuarant = await this.db.update(this.entity)
            .set({ 
                name: payload.name || existingMenuItem.name,
                description: payload.description,
                price: payload.price,
                imageUrl: payload.imageUrl || existingMenuItem.imageUrl
            })
            .where(eq(this.entity.id, id))
            .returning();
        
        return isEmpty(updatedRestuarant) ? null : updatedRestuarant[0];
    }

    public async findManyByIds(ids: string[]): Promise<MenuItem[] | null> {
        try {
            const menuItems = await this.db.select()
                .from(this.entity)
                .where(inArray(this.entity.id, ids)); // TODO: Raise issue on drizzle's team
            return isEmpty(menuItems) ? null : menuItems;
        } catch (error) {
            console.log({ error })
            throw new ServerError("Invalid item ids", error instanceof Error ? error.message : null);
        }
    } 
}