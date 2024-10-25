import { Router } from "express";

import { catchAsyncErrors } from "../utils/helpers";
import { subMenuItemGroupController } from "../controllers/sub-menu-item-group";


const router = Router({ mergeParams: true });

// router.get("/with-restaurants", catchAsyncErrors(menuCategoryController.getCategoriesWithRestaurant));

// router.get("/:id", catchAsyncErrors(subMenuItemGroupController.getOne));

// router.get("/", catchAsyncErrors(subMenuItemGroupController.getManyCategories));

router.post("/", catchAsyncErrors(subMenuItemGroupController.create));


export default router;



