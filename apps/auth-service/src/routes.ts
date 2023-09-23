import { Router } from "express";
import { customerRoutes } from "./domains/customer/customer.routes";

const router = Router();

router.use("/customer", customerRoutes);

export { router as appRouter };