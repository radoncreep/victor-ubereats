import { Router } from "express";

import vendorRoutes from "./vendor";
import customerRoutes from "./customer";

const router = Router();

router.use("/vendor", vendorRoutes);
router.use("/customer", customerRoutes);

export default router;
