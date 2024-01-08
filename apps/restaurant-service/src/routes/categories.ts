import { Router } from "express";
import { catchAsyncErrors } from "../utils/helpers";
import { categoriesController } from "../controllers/categories";

const router = Router();

router.get("/with-restaurants", catchAsyncErrors(categoriesController.getCategoriesWithRestaurant));

router.get("/:id", catchAsyncErrors(categoriesController.getOne));

router.get("/", catchAsyncErrors(categoriesController.getManyCategories));

router.post("/", catchAsyncErrors(categoriesController.create));


export default router;