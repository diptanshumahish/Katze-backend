"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, details) => {
    res.status(statusCode)
        .json({ timestamp: Date.now(), message: message, details: details })
        .end();
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map