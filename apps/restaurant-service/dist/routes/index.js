"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_1 = __importDefault(require("./vendor"));
const customer_1 = __importDefault(require("./customer"));
const router = (0, express_1.Router)();
router.use("/vendor", vendor_1.default);
router.use("/customer", customer_1.default);
exports.default = router;
