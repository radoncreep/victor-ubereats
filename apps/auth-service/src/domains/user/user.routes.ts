import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { userValidationPipe } from "./user.middleware";
import { PasswordService } from "../../features/password/password.service";

const router = Router();
const userController = new UserController(
    new UserRepository, 
    new PasswordService
);

router.post("", userValidationPipe, userController.createUser);

export { router as userRoutes };