import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "fcd73615efdf1e5483def1256c0b0a31a5b45e7508aeb43aec5e8008598f67ea",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Backend Server!");
});

app.get("/test-db", async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("res", res);
    res.json({ success: true, time: result.rows[0].now });
    client.release();
  } catch (error) {
    console.error("Database connection error", error);
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
