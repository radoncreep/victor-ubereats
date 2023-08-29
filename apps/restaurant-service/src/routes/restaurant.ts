import { Router } from "express";

import { restaurantController } from "../controllers/restaurant";
import { validationPipe } from "../middleware/validations/pipes";
import { authorizeRole } from "../middleware/rbac/authorization";

const router = Router();

router.get("/:restaurantId");

router.get("", restaurantController.getMany);

router.post(
    "",
    // authorizeRole, 
    validationPipe, 
    restaurantController.create
);

router.put("");

router.delete("/:restaurantId");

export default router;