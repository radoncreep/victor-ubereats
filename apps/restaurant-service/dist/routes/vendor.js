"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuItem_1 = require("../controllers/menuItem");
const authorization_1 = require("../middleware/authorization");
const router = (0, express_1.Router)();
// vendor routes
// create restaurant 
router.get("restaurants/:restaurantId");
router.post("/restaurants");
router.put("/restaurants/:restaurantId");
router.delete("/restaurants/:restaurantId");
// create menuItem
router.post("/restaurants", authorization_1.authorizeRole, menuItem_1.menuItemController.create);
router.put("/restaurants", authorization_1.authorizeRole, menuItem_1.menuItemController.update);
router.delete("/restaurants", authorization_1.authorizeRole, menuItem_1.menuItemController.delete);
router.get("/restaurants/:menuItemId", menuItem_1.menuItemController.getById);
router.get("/restaurants", menuItem_1.menuItemController.getAll);
exports.default = router;
