import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { userValidationPipe } from "./user.middleware";

const router = Router();
const userController = new UserController(new UserRepository);

router.post("", userValidationPipe, userController.createUser);

export { router as userRoutes };