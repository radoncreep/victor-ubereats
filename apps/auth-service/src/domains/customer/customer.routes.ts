import { Router } from "express";
import { RedisCacheService } from "ubereats-cache-pkg";

import { PasswordService } from "../../services/password/password.service";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { customerValidationPipe } from "./customer.middleware";
import { TokenManager } from "../../services/jwt/jwt.service";
import { PhoneService } from "../../services/phone/phone.service";
import { OneTimePasswordService } from "../../services/oneTimePassword/otp.service";
import { catchAsyncErrors } from "../../utility/errorHandler";

const router = Router();

const customerController = new CustomerController(
    new CustomerRepository,
    new PasswordService,
    new TokenManager,
    new PhoneService,
    new OneTimePasswordService,
    new RedisCacheService
);

router.post("",
    customerValidationPipe,
    catchAsyncErrors(customerController.create)
);

router.get("/:customerId",
    catchAsyncErrors(customerController.getUserById)
);

router.put("/:customerId",
    catchAsyncErrors(customerController.updateUser)
);

router.delete("/",
    catchAsyncErrors(customerController.deactivateUser)
);

router.post("/submit/phone", 
    catchAsyncErrors(customerController.submitPhone)
);

export { router as customerRoutes };