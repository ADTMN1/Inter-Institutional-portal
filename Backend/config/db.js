const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: true,
  },
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully to Aiven!");
  }
});

module.exports = connection;
const mysql = require("mysql2");
require("dotenv").config();

console.log("🔧 Database Configuration:");
console.log("Host:", process.env.HOST);
console.log("Port:", process.env.DB_PORT);

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeout: 60000, // Increase timeout
  acquireTimeout: 60000,
  timeout: 60000,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    console.log("💡 Check Aiven firewall settings");
  } else {
    console.log("✅ MySQL connected successfully to Aiven!");
  }
});

// Handle connection errors
connection.on("error", (err) => {
  console.log("Database error:", err.message);
});

module.exports = connection;
