import { Router } from "express";

import restaurantRoutes from "./restaurant";
import menuItemRoutes from "./menuItem";
import categoriesRoutes from "./categories";
import menusRoutes from "./menu";
import menuCategoriesRoutes from "./menu-categories";
import subMenuItemGroupRoutes from "./sub-menu-item-group";


const router = Router();

router.use("/restaurant", restaurantRoutes);

router.use("/:restaurantId/menus", menusRoutes);

router.use("/categories", categoriesRoutes);

router.use("/:restaurantId/menu-category/:menuCategoryId/menu-item", menuItemRoutes);

router.use("/:restaurantId/menu-items/:menuItemId/sub-item-group", subMenuItemGroupRoutes);

router.use("/:restaurantId/menus/:menuId/menu-category", menuCategoriesRoutes);


export default router;
