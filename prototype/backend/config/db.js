
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    console.log("DB connection OK:", rows[0]);
  } catch (err) {
    console.error("DB connection FAILED:", err.message);
  }
}

module.exports = { pool, testConnection };