import express from "express";

import {
    deleteUserById,
    getUserById,
    getUserByUserName,
    getUsers,
} from "../db/users";
import { sendResponse } from "../utilities/response";

export const getAllUSers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const { username, writtenBlogs } = req.body;

        const user = await getUserById(id);

        if (username !== undefined) {
            user.username = username;
            const usernameTaken = await getUserByUserName(username);
            if (usernameTaken) {
                return sendResponse(res, 400, "username exists");
            }
        }
        if (writtenBlogs !== undefined) {
            user.writtenBlogs = writtenBlogs;
        }

        await user.save();
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
