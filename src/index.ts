import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/index";
// import dotenv from "dotenv";
const app = express();
const PORT = 5000;
app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb" }));

// const server = http.createServer(app);

// server.listen(3000, () => {
//     console.log("katze speaks backend running on https://localhost:3000/");
// });
app.listen(PORT, () =>
    console.log(`Server started on port : http://localhost:${PORT}`)
);

const MONGO_URI =
    "mongodb+srv://diptanshumahish:LQFZEhzFzyLEE14Y@cluster0.twmquyf.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully to " + MONGO_URI);
});

app.use("/", router());
