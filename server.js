import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowOrigins = ["https://authenticationpro.onrender.com"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowOrigins, credentials: true, methods: ["GET", "POST", "PUT", "DELETE"]}));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server started on PORT ${port}`));

async function main() {
  await mongoose.connect(`${process.env.MONGO_URL}/mern-auth`);
}

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
