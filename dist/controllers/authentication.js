"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const response_1 = require("../utilities/response");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (0, response_1.sendResponse)(res, 401, "Missing email or password", "Enter all fields");
        }
        const user = await (0, users_1.getUsersByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            return (0, response_1.sendResponse)(res, 403, "No user with this email", "Check your email");
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return (0, response_1.sendResponse)(res, 405, "Incorrect password", "Please enter correct password");
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("Katze-cookie", user.authentication.sessionToken);
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.error(error);
        return (0, response_1.sendResponse)(res, 400, "Error occurred", "Unknown error, check your connection and try again");
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username, profilePicture } = req.body;
        // if (!email || !password || !username || !profilePicture) {
        //     return sendResponse(res, 401, "Missing fields");
        // }
        const existingUser = await (0, users_1.getUsersByEmail)(email);
        const usernameTaken = await (0, users_1.getUserByUserName)(username);
        if (existingUser) {
            return (0, response_1.sendResponse)(res, 402, "This email is already registered", "Maybe try logging in again with a new email?");
        }
        if (usernameTaken) {
            return (0, response_1.sendResponse)(res, 406, "Username is unavailable, try a new one", "Usernames must be as unique as you are");
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            profilePicture,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return (0, response_1.sendResponse)(res, 400, "Error occurred", "Please try again");
    }
};
exports.register = register;
const getUser = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await (0, users_1.getUserBySessionToken)(token);
        res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=authentication.js.map