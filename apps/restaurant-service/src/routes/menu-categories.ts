import { Router } from "express";
import { catchAsyncErrors } from "../utils/helpers";
import { categoriesController } from "../controllers/categories";
import { menuCategoryController } from "../controllers/menu-category";

const router = Router();

// router.get("/with-restaurants", catchAsyncErrors(menuCategoryController.getCategoriesWithRestaurant));

router.get("/:id", catchAsyncErrors(menuCategoryController.getOne));

// router.get("/", catchAsyncErrors(menuCategoryController.getManyCategories));

router.post("/", catchAsyncErrors(menuCategoryController.create));


export default router;