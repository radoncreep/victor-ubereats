import { Router } from "express";

import { restaurantController } from "../controllers/restaurant";
import { validationPipe } from "../middleware/validations/pipes";

const router = Router();

router.get("/:restaurantId");
router.post("", validationPipe, restaurantController.create);
router.put("");
router.delete("/:restaurantId");

export default router;