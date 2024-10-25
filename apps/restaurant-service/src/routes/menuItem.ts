import { Router } from "express";

import { authorizeRole } from "../middleware/rbac/authorization";
import { catchAsyncErrors } from "../utils/helpers";
import { menuItemController } from "../controllers/menuItem";


const router = Router({ mergeParams: true });


router.get("/:menuItemId", catchAsyncErrors(menuItemController.getById));

router.get("/", catchAsyncErrors(menuItemController.getMany));

router.post("/",
    // authorizeRole, 
    catchAsyncErrors(menuItemController.create)
);

router.put(
    "/", 
    authorizeRole, 
    catchAsyncErrors(menuItemController.update)
);

router.delete(
    "/:menuItemId", 
    authorizeRole, 
    catchAsyncErrors(menuItemController.delete)
);

export default router;