"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantController = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const app_1 = require("../app");
const user_1 = require("../schema/user");
class RestaurantController {
    constructor() { }
    async getById(req, res) {
        const { restaurantId } = req.params;
        const data = await app_1.db
            .select({ id: user_1.user.id, name: user_1.user.name, email: user_1.user.email })
            .from(user_1.user)
            .where((0, drizzle_orm_1.eq)(user_1.user.id, Number(restaurantId)));
        return res.json({ success: true, payload: data });
    }
    async getAll() {
        return await app_1.db.select().from(user_1.user);
    }
    create() { }
    update() { }
    delete() { }
}
exports.restaurantController = new RestaurantController();
