import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import fitness from "./routes/fitness.js";
import process from "process";
import WorkRoutes from "./routes/WorkRoutes.js";
import NutiRoutes from "./routes/NutiRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/", fitness);
app.use("/api/", WorkRoutes);
app.use("/api/", NutiRoutes);

const PORT = process.env.PORT ||10000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));