import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

const app: Application = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

export default app;
