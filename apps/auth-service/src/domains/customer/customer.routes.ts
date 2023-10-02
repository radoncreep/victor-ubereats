import { Router } from "express";

import { PasswordService } from "../../services/password/password.service";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { customerValidationPipe } from "./customer.middleware";
import { TokenManager } from "../../services/jwt/jwt.service";
import { PhoneService } from "../../services/phone/phone.service";
import { OneTimePasswordService } from "../../services/oneTimePassword/otp.service";
import { CacheService } from "../../services/cache/cache.service";


const router = Router();

const customerController = new CustomerController(
    new CustomerRepository,
    new PasswordService,
    new TokenManager,
    new PhoneService, 
    new OneTimePasswordService,
    new CacheService
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