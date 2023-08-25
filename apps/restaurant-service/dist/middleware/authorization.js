"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authorizeRole(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new Error("error in request");
    const token = authHeader.split(" ")[1];
    const decodedToken = (0, jsonwebtoken_1.verify)(token, "supernicesecret");
    const user = decodedToken["role"];
    if (user.role === "vendor") {
        req.user = user;
        next();
    }
    else {
        throw new Error("Bad Request");
    }
}
exports.authorizeRole = authorizeRole;
