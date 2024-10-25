import { Router } from "express";
import multer from "multer";

import RestaurantController from "../controllers/restaurant";
import { deleteOneValidation, validateUUID, validationPipe } from "../middleware/validations/pipes";
import { authorizeRole } from "../middleware/rbac/authorization";
import ImageService from "../services/image/ImageService";
import CloudinaryImageStorage from "../services/image/ImageStorage";
import { catchAsyncErrors } from "../utils/helpers";
import RestaurantRepositoryImpl from "../repository/RestaurantRepository";
import { categoryRepository } from "../repository/CategoryRepository";


const restaurantController = new RestaurantController(
    new ImageService(new CloudinaryImageStorage, null),
    new RestaurantRepositoryImpl,
    categoryRepository
);

const upload = multer({ 
    limits: { fieldSize: 1000000 }
});

const router = Router();

// router.get("/:id", validateUUID, restaurantController.getById);
router.get("/single", validateUUID, catchAsyncErrors(restaurantController.getOne))

router.get("", restaurantController.getMany);

router.post(
    "",
    // authorizeRole, 
    upload.single("image"),
    // validationPipe, 
    catchAsyncErrors(restaurantController.create)
);

router.put(
    "/:id", 
    validationPipe,
    restaurantController.update
);

router.delete("/:id", validateUUID, restaurantController.delete);

// router.delete("/", deleteOneValidation, catchAsyncErrors(restaurantController.delete));

export default router;