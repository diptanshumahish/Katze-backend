import express from "express";
import {
    createUser,
    getUserBySessionToken,
    getUserByUserName,
    getUsersByEmail,
} from "../db/users";
import { authentication, random } from "../helpers";
import { sendResponse } from "../utilities/response";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 401, "Missing email or password");
        }
        const user = await getUsersByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return sendResponse(res, 403, "No user with this email");
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return sendResponse(res, 405, "Incorrect password");
        }
        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );
        await user.save();
        res.cookie("Katze-cookie", user.authentication.sessionToken);
        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return sendResponse(res, 400, "Error occurred");
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, profilePicture } = req.body;
        // if (!email || !password || !username || !profilePicture) {
        //     return sendResponse(res, 401, "Missing fields");
        // }
        const existingUser = await getUsersByEmail(email);
        const usernameTaken = await getUserByUserName(username);
        if (existingUser) {
            return sendResponse(res, 402, "This email is already registered");
        }
        if (usernameTaken) {
            return sendResponse(
                res,
                406,
                "Username is unavailable, try a new one"
            );
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            profilePicture,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return sendResponse(res, 400, "Error occurred");
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { token } = req.params;
        const user = await getUserBySessionToken(token);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
