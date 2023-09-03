import { Router } from "express";

import { MenuItemController } from "../controllers/menuItem";
import { authorizeRole } from "../middleware/rbac/authorization";
import { MenuItemRepository } from "../repository/MenuItemRepository";

const router = Router();
const menuItemController = new MenuItemController(new MenuItemRepository());

router.get("/:menuItemId", menuItemController.getById);
router.get("/", menuItemController.getAll);
router.post("/",
    // authorizeRole, 
    menuItemController.create
);
router.put("/", authorizeRole, menuItemController.update);
router.delete("/:menuItemId", authorizeRole, menuItemController.delete);

export default router;