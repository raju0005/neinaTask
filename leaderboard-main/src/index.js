import express from "express";
import { connectDb } from "./config/dbConenction.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// *********** All-Routes *************
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";
// *********** All-Routes *************

const app = express();

// Use CORS middleware to allow requests from all origins
app.use(cors({
  origin: 'https://neina-task.vercel.app', // Allow this origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow specific HTTP methods
  credentials: false, // Allow credentials if needed
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************
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

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: err.message,
    });
});

app.listen(7000, async () => {
    console.log("Server is running on port 7000");
    await connectDb();
});
