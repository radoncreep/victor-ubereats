import { NextFunction, Request, Response } from "express";
import { and, eq, exists, Relation } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";

import { RestaurantSchema, restaurant } from "../schema/restaurant";
import { db } from "../config/database";
import { isEmpty } from "../utils/helper";



// interface ImageUploadService {
//     post(file: File): Promise<{url: string}>;
//     update(uri: string): Promise<{url: string}>;
//     delete(uri: string): Promise<{url: string}>;
// }

class RestaurantController {

    constructor() {}

    async getById(req: Request, res: Response): Promise<Response<RestaurantSchema>> {
        const { restaurantId } = req.params;

        const data = await db
            .select()
            .from(restaurant)
            .where(eq(restaurant.id, restaurantId));

        return res.json({ success: true, payload: data });
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        return await db.select().from(restaurant);
    }

    async create(req: Request, res: Response, next: NextFunction) {        
        const payload = req.body;

        const nameExists = await db.select()
            .from(restaurant)
            .where(
                and(
                    eq(restaurant.name, payload.name), 
                    eq(restaurant.phone, payload.phone)
                )
            );

        if (!isEmpty(nameExists)) {
            const error = new Error();
            error.message = "restaurant name already exists.";
            next(error);
            return;
        }

        try { 
            // upload image from request to a cdn or bucket - ImageUploadService

            const data = await db
                .insert(restaurant)
                .values({...payload, id: uuid4()})
                .returning({ id: restaurant.id });

            // event for created restaurant event or pubsub
            return res.status(201).send({success: true, payload: data});
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response) {
        const payload: RestaurantSchema = req.body;

        try {
            const updatedUserId = await db.update(restaurant)
                .set(payload)
                .where(eq(restaurant.id, payload.id))
                .returning();
            
            return res.status(201).json({ success: true, payload: updatedUserId })
        } catch (error) {
            console.log(`DB Error: ${error}`);
        }
    }

    async delete(req: Request, res: Response) {
        const payload: RestaurantSchema = req.body;

        try {
            const updatedUserId = await db.delete(restaurant)
                .where(eq(restaurant.id, payload.id))
            
            return res.status(200).json({ success: true, payload: null }); 
        } catch (error) {
            console.log(`DB Error: ${error}`);
        }
    }
}

export const restaurantController = new RestaurantController();