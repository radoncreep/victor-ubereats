import { Router } from "express";

import { catchAsyncErrors } from "../utils/helpers";
import { menuController } from "../controllers/menu";


const router = Router({ mergeParams: true });

// router.get("/with-restaurants", catchAsyncErrors(menuCategoryController.getCategoriesWithRestaurant));

router.get("/:id", catchAsyncErrors(menuController.getOne));

// router.get("/", catchAsyncErrors(menuController.getManyCategories));

router.post("", catchAsyncErrors(menuController.create));

router.get("", catchAsyncErrors(menuController.getAll))


export default router;