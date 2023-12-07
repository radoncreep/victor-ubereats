import { Router } from "express";

import RestaurantController from "../controllers/restaurant";
import { validateUUID, validationPipe } from "../middleware/validations/pipes";
import { authorizeRole } from "../middleware/rbac/authorization";
import multer from "multer";
import ImageService from "../services/image/ImageService";
import CloudinaryImageStorage from "../services/image/ImageStorage";
import { catchAsyncErrors } from "../utils/helpers";

const restaurantController = new RestaurantController(
    new ImageService(new CloudinaryImageStorage, null)
);

const upload = multer({ 
    limits: { fieldSize: 1000000 }
});

const router = Router();

router.get("/:id", validateUUID, restaurantController.getById);

router.get("", restaurantController.getMany);

router.post(
    "",
    // authorizeRole, 
    // validationPipe, 
    upload.single("image"),
    catchAsyncErrors(restaurantController.create)
);

router.put(
    "/:id", 
    validationPipe,
    restaurantController.update
);

router.delete("/:id", validateUUID, restaurantController.delete);

export default router;