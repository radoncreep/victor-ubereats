import { v4 as uuid4 } from "uuid";
import { eq, and, or } from "drizzle-orm";

import { restaurants } from "../schema/restaurant";
import type { NewRestaurantSchema, RestaurantSchema } from "../schema/restaurant";
import { PaginatedRepositoryParams, Repository } from "./RepositoryInterface";
import { databaseClient } from "../config/database";
import { ServerError } from "../error/server.error";
import { isEmpty } from "../utils/helpers";


export interface RestaurantRepository extends Repository<NewRestaurantSchema, RestaurantSchema> {
    findByNameOrPhone?(payload: { name: string, phone: string }): Promise<NewRestaurantSchema | null>;
    findOne?(paylaod: { name: string }): Promise<RestaurantSchema>;
}

export default class RestaurantRepositoryImpl implements Repository<NewRestaurantSchema, RestaurantSchema> {
    private readonly database = databaseClient;
    private readonly table = restaurants;

    create = async(payload: NewRestaurantSchema): Promise<RestaurantSchema> => {
        try {     
            const result  = await this.database
                .insert(this.table)
                .values({...payload, id: uuid4()})
                .returning();
            
            return result[0];
        } catch (error) {
            throw new ServerError(
                "Server Error: Couldn't create new restaurant",
                error instanceof Error ? error.message : null
            );
        }
    }

    deleteOne = async (selector: { id: string }): Promise<void> => {
        console.log("DELETING")
        try {
            await this.database
                .delete(this.table)
                .where(eq(this.table.id, selector.id));
        } catch (error) {
            throw new ServerError(
                "Server Error: Failed to delete. Please try again.",
                error instanceof Error ? error.message : null
            )
        }
    }

    getById = async(id: string): Promise<RestaurantSchema | null> => {
        try {
            const result = await this.database.select()
            .from(restaurants)
            .where(
                and(
                    eq(restaurants.id, id)
                )
            );

            return isEmpty(result) ? null : result[0];
        } catch (error) {
            throw error;
        }
    }

    getOne = async (selector: { id: string }) => {
        try {
            const result = await this.database.select()
            .from(restaurants)
            .where(
                and(
                    eq(restaurants.id, selector.id)
                )
            );

            return result[0];
        } catch (error) {
            throw error;
        }
    }

    getMany = async (pagination: PaginatedRepositoryParams): Promise<RestaurantSchema[]> =>  {
        throw new Error("Method not implemented.");
    }

    update = async (id: string, payload: NewRestaurantSchema): Promise<RestaurantSchema> => {
        throw new Error("Method not implemented.");
    }

    findByNameOrPhone = async (selector: { name: string, phone: string }): Promise<RestaurantSchema | null> => {
        const result = await this.database
            .select()
            .from(this.table)
            .where(or(
                eq(this.table.name, selector.name),
                eq(this.table.phone, selector.phone),
            )); 

        return isEmpty(result) ? null : result[0];
    }
}