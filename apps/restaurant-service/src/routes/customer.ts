import { Router } from "express";

import { menuItemController } from "../controllers/menuItem";
import { restaurantController } from "../controllers/restaurant";

const router = Router();

router.get("/restaurants/:restaurantId", restaurantController.getById);

router.get("/restaurants");

router.get("/restaurants/:menuItemId", menuItemController.getById);

router.get("/restaurants", menuItemController.getAll);

export default router;