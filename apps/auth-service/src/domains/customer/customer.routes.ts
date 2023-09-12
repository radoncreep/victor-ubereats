import { Router } from "express";

import { PasswordService } from "../../features/password/password.service";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { customerValidationPipe } from "./customer.middleware";

const router = Router();

const customerController = new CustomerController(
    new CustomerRepository,
    new PasswordService
);

router.post("", 
    customerValidationPipe, 
    customerController.create
);

export { router as customerRoutes };