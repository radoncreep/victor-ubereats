import { Router } from "express";

import restaurantRoutes from "./restaurant";
import menuItemRoutes from "./menuItem";
import categoriesRoutes from "./categories";

const router = Router();

router.use("/restaurant", restaurantRoutes);
router.use("/menu-item", menuItemRoutes);
router.use("/categories", categoriesRoutes) 

export default router;
