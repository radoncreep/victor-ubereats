import { Router } from "express";

import restaurantRoutes from "./restaurant";
import menuItemRoutes from "./menuItem";
import categoriesRoutes from "./categories";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/menu-item", menuItemRoutes);

export default router;
