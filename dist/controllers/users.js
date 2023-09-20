"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUSers = void 0;
const users_1 = require("../db/users");
const response_1 = require("../utilities/response");
const getAllUSers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllUSers = getAllUSers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, users_1.deleteUserById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, writtenBlogs } = req.body;
        const user = await (0, users_1.getUserById)(id);
        if (username !== undefined) {
            user.username = username;
            const usernameTaken = await (0, users_1.getUserByUserName)(username);
            if (usernameTaken) {
                return (0, response_1.sendResponse)(res, 400, "username exists");
            }
        }
        if (writtenBlogs !== undefined) {
            user.writtenBlogs = writtenBlogs;
        }
        await user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map