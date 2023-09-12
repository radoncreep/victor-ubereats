// import { Request, Response, NextFunction, Router } from "express";
// import { UserController } from "./user.controller";
// import { UserRepository } from "./user.repository";
// import { userValidationPipe } from "./user.middleware";
// import { PasswordService } from "../../features/password/password.service";
// import { UserRoles } from "ubereats-types";

// const router = Router();
// const userController = new UserController(
//     new UserRepository(new PasswordService)
// );

// function assignCustomerRole(req: Request, res: Response, next: NextFunction) {
//     req.body["role"] = UserRoles.Customer;
//     next();
// }

// router.post("", 
//     userValidationPipe, 
//     assignCustomerRole,
//     userController.createUser
// );

// export { router as userRoutes };