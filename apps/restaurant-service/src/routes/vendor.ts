import { Router } from "express";
import type { Request, Response } from "express";
import { menuItemController } from "../controllers/menuItem";
import { authorizeRole } from "../middleware/authorization";

const router = Router();

// vendor routes
// create restaurant 
router.get("restaurants/:restaurantId");
router.post("/restaurants");
router.put("/restaurants/:restaurantId");
router.delete("/restaurants/:restaurantId");

// create menuItem
router.post("/restaurants", authorizeRole, menuItemController.create);
router.put("/restaurants", authorizeRole, menuItemController.update);
router.delete("/restaurants", authorizeRole, menuItemController.delete);
router.get("/restaurants/:menuItemId", menuItemController.getById);
router.get("/restaurants", menuItemController.getAll);

export default router;