"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["Customer"] = "customer";
    UserRoleEnum["Vendor"] = "vendor";
    UserRoleEnum["Rider"] = "rider";
})(UserRoleEnum || (UserRoleEnum = {}));
exports.roleEnum = (0, pg_core_1.pgEnum)('role', [
    UserRoleEnum.Customer,
    UserRoleEnum.Rider,
    UserRoleEnum.Vendor
]);
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, exports.roleEnum)('role').notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
