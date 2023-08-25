import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../app";
import { user } from "../schema/user";


class RestaurantController {

    constructor() {}

    async getById(req: Request, res: Response) {
        const { restaurantId } = req.params;

        const data = await db
            .select({ id: user.id, name: user.name, email: user.email })
            .from(user)
            .where(eq(user.id, Number(restaurantId)));

        return res.json({ success: true, payload: data });
    }

    async getAll() {
        return await db.select().from(user);
    }

    create() {}

    update() {}

    delete() {}
}

export const restaurantController = new RestaurantController();