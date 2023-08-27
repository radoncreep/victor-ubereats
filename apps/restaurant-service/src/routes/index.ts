import { Router } from "express";

import restaurantRoutes from "./restaurant";
import customerRoutes from "./menuItem";

const router = Router();

router.use("/restaurant", restaurantRoutes);
router.use("/customer", customerRoutes);

export default router;
