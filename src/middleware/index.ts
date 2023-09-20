import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";
import { sendResponse } from "../utilities/response";

export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return sendResponse(res, 400, "cant delete");
        }
        if (currentUserId.toString() !== id) {
            return sendResponse(res, 400, "You can't delete others accounts");
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies["Katze-cookie"];
        if (!sessionToken) {
            return sendResponse(res, 400, "Session expired");
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return sendResponse(res, 400, "Invalid token");
        }
        merge(req, { identity: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
