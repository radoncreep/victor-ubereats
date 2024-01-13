import { Router } from "express";

import { catchAsyncErrors } from "../utils/helpers";
import { menuCategoryController } from "../controllers/menu-category";


const router = Router({ mergeParams: true });

// router.get("/with-restaurants", catchAsyncErrors(menuCategoryController.getCategoriesWithRestaurant));

router.get("/:id", catchAsyncErrors(menuCategoryController.getOne));

// router.get("/", catchAsyncErrors(menuCategoryController.getManyCategories));

router.post("/", catchAsyncErrors(menuCategoryController.create));

router.put("/", catchAsyncErrors(menuCategoryController.update));



export default router;