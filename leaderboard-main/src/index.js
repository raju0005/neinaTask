import express from "express";
import { connectDb } from "./config/dbConenction.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";

const app = express();



app.use( cors({
  origin: "*", // Allows all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define your routes after the middleware
app.get("/api/auth", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// For wrong APIs
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

connectDb();

app.listen(7000, async () => {
  console.log("Server is running on port 7000");
});