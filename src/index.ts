import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use("/", router());

const MONGO_URL =
  "mongodb+srv://hadi:admin123@cluster0.d343x.mongodb.net/server-ts?retryWrites=true&w=majority";

const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDb();
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on("error", (error: Error) => console.log(error));
