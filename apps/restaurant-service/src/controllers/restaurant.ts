import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { User, user } from "../schema/user";
import { db } from "..";
import { RestaurantSchema, restaurant } from "../schema/restaurant";


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
        return res.json({ success: true, payload: null })
    }

    async update() {}

    async delete() {}
}

export const restaurantController = new RestaurantController();