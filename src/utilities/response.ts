import express from "express";
export const sendResponse = (
    res: express.Response,
    statusCode: number,
    message: string,
    details: string
) => {
    res.status(statusCode)
        .json({ timestamp: Date.now(), message: message, details: details })
        .end();
};
