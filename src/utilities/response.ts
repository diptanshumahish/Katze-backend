import express from "express";
export const sendResponse = (
    res: express.Response,
    statusCode: number,
    message: string
) => {
    res.status(statusCode).json({ message }).end();
};
