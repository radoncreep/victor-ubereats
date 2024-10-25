import { inArray, eq, sql } from "drizzle-orm";

import { databaseClient } from "../config/database";
import { NewSubMenuItemGroupSchema, SubMenuItemGroupSchema, subMenuItemGroup } from "../schema/sub-menu";
import { isEmpty } from "../utils/helpers";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { ServerError } from "../error/server.error";


export interface SubMenuItemGroupRepository extends Partial<Repository<NewSubMenuItemGroupSchema, SubMenuItemGroupSchema>> {
    create(payload: NewSubMenuItemGroupSchema): Promise<SubMenuItemGroupSchema>;
    // updateOne(id: string, item: MenuItemSchema): Promise<SubMenuItemGroupSchema>;
}

export default class SubMenuItemGroupRepositoryImpl implements SubMenuItemGroupRepository {
    private readonly database = databaseClient;
    private readonly table = subMenuItemGroup;

    public async create(payload: NewSubMenuItemGroupSchema): Promise<SubMenuItemGroupSchema> {
        try {
            const result = await this.database.insert(this.table).values(payload).returning();
    
            if (isEmpty(result)) {
                throw new ServerError("Unable to create sub-menu-item-group");
            }
    
            return result[0];
        } catch (error) {
            console.log("error ", error)
            throw error;
        }
    }

    async getMany(pagination: PaginatedRepositoryParams, id: string): Promise<SubMenuItemGroupSchema[] | null> {
        const {page, limit} = pagination;
        const offset = (page - 1) * limit;

        const paginatedMenuItems = await this.database.select()
            .from(this.table)
            .limit(limit)
            .offset(offset)
            .where(eq(this.table.restaurantId, id));

        return isEmpty(paginatedMenuItems) ? null : paginatedMenuItems;
    }

    // updateOne(id: string, item: MenuItemSchema) {
    //     const options = this.database.select({
    //         options: this.table.options
    //     }).from(this.table);
    //     const option = options[0];
    //     this.database.update(this.table).set({ options: options[0] })

    //     // throw new
    // }
}