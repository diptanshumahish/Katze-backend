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
            return sendResponse(
                res,
                400,
                "cant delete",
                "Can't process try again"
            );
        }
        if (currentUserId.toString() !== id) {
            return sendResponse(
                res,
                400,
                "You can't delete others accounts",
                "Do not try to delete others account"
            );
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
            return sendResponse(
                res,
                400,
                "Session expired",
                "Session has expired "
            );
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return sendResponse(res, 400, "Invalid token", "invalid");
        }
        merge(req, { identity: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
