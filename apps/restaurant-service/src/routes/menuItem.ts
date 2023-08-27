import { Router } from "express";

import { menuItemController } from "../controllers/menuItem";
import { authorizeRole } from "../middleware/rbac/authorization";

const router = Router();

router.get("/:menuItemId", menuItemController.getById);
router.get("/", menuItemController.getAll);
router.post("/", authorizeRole, menuItemController.create);
router.put("/", authorizeRole, menuItemController.update);
router.delete("/:menuItemId", authorizeRole, menuItemController.delete);

export default router;