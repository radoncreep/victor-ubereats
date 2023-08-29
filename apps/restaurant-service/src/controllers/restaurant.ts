import { Request, Response } from "express";
import { eq, Relation } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";

import { RestaurantSchema, restaurant } from "../schema/restaurant";
import { db } from "../config/database";



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

    async getAll(req: Request, res: Response) {
        return await db.select().from(restaurant);
    }

    async create(req: Request, res: Response) {        
        const payload = req.body;
        console.log({ payload })

        try {     
            const data = await db
                .insert(restaurant)
                .values({...payload, id: uuid4()})
                .returning({ id: restaurant.id });

            // event for created restaurant
            return res.status(201).send(data);
        } catch (error) {
            console.log(`DB Error: ${error}`)
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