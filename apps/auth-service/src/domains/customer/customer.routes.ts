import { Router } from "express";

import { PasswordService } from "../../features/password/password.service";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { customerValidationPipe } from "./customer.middleware";
import { TokenManager } from "../../features/jwt/jwt.service";

const router = Router();

const customerController = new CustomerController(
    new CustomerRepository,
    new PasswordService,
    new TokenManager
);

router.post("", 
    customerValidationPipe, 
    customerController.create
);

router.get("/:customerId",
    customerController.getUserById
);

router.put("/:customerId",
    customerController.updateUser
);

router.delete("/",
    customerController.deactivateUser
);

export { router as customerRoutes };