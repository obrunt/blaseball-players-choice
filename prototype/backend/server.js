// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import routes
const healthRoute = require("./src/routes/health.route");

const { testConnection } = require("./config/db");

// Middlewares
app.use(cors());

const frontendOrigin = process.env.FRONTEND_BASE_URL || "http://localhost:3000";

// Limit request body size to reduce abuse/memory pressure.
// JSON and URL-encoded payloads larger than 1mb will be rejected with HTTP 413.
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Health check route
app.use("/api/health", healthRoute);


// Test DB connection
testConnection();

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
