"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./router/index"));
// import dotenv from "dotenv";
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: "30mb" }));
// const server = http.createServer(app);
// server.listen(3000, () => {
//     console.log("katze speaks backend running on https://localhost:3000/");
// });
app.listen(PORT, () => console.log(`Server started on port : http://localhost:${PORT}`));
const MONGO_URI = "mongodb+srv://diptanshumahish:LQFZEhzFzyLEE14Y@cluster0.twmquyf.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URI);
mongoose_1.default.connection.on("error", (error) => console.log(error));
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected successfully to " + MONGO_URI);
});
app.use("/", (0, index_1.default)());
//# sourceMappingURL=index.js.map