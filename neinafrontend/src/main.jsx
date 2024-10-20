import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Leaderboard from "./pages/LeaderBoard.jsx";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import ProtectedRoute from "./context/ProtectedRoutes"; // Import the protected route component
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Default to login */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}> {/* Wrap protected routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
