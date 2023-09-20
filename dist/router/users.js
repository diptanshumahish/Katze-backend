"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get("/users", users_1.getAllUSers);
    router.delete("/users/:id", middleware_1.isOwner, users_1.deleteUser);
    router.patch("/users/:id", users_1.updateUser);
};
//# sourceMappingURL=users.js.map