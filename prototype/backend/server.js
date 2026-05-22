// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Import routes
const healthRoute = require("./src/routes/health.route");

const { testConnection } = require("./config/db");

// Middlewares
app.use(cors());

const frontendOrigin = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
const cspConnectSrc = ["'self'", frontendOrigin, "http://localhost:3001"];

// Security headers + CSP baseline.
// CSP tells the browser which resource origins are allowed, reducing XSS impact
// by blocking unexpected script execution and restricting external connections.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],            // fallback for all resource types
        baseUri: ["'self'"],               // prevent base URL injection
        objectSrc: ["'none'"],             // block legacy plugin content
        frameAncestors: ["'none'"],        // prevent clickjacking via iframes
        imgSrc: ["'self'", "data:", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'"], // allow inline styles needed by UI libs
        scriptSrc: ["'self'"],             // only execute same-origin scripts
        connectSrc: cspConnectSrc,         // allow API/fetch/WebSocket targets
      },
    },
    crossOriginEmbedderPolicy: false,      // keep local dev tooling compatibility
  })
);

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
