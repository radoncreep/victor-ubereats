import { Router } from "express";
import { emailRouter } from "./features/email/email.routes";
import { customerRoutes } from "./domains/customer/customer.routes";

const router = Router();

router.use("/customer", customerRoutes);

export { router as appRouter };