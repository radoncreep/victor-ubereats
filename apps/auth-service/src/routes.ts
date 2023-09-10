import { Router } from "express";
import { emailRouter } from "./features/email/email.routes";
import { userRoutes } from "./domains/user/user.routes";

const router = Router();

router.use("/user", userRoutes);

export { router as appRouter };