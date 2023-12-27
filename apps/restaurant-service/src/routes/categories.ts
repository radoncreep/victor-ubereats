import { Router } from "express";
import { catchAsyncErrors } from "../utils/helpers";
import { categoriesController } from "../controllers/categories";

const router = Router();

router.get("/:id", catchAsyncErrors(categoriesController.getOne));

router.post("/", catchAsyncErrors(categoriesController.create));

export default router;