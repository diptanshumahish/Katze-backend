"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const response_1 = require("../utilities/response");
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id");
        if (!currentUserId) {
            return (0, response_1.sendResponse)(res, 400, "cant delete", "Can't process try again");
        }
        if (currentUserId.toString() !== id) {
            return (0, response_1.sendResponse)(res, 400, "You can't delete others accounts", "Do not try to delete others account");
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["Katze-cookie"];
        if (!sessionToken) {
            return (0, response_1.sendResponse)(res, 400, "Session expired", "Session has expired ");
        }
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return (0, response_1.sendResponse)(res, 400, "Invalid token", "invalid");
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map