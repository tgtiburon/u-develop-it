require("dotenv").config();
const mysql = require("mysql2");
//Connect to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the election database.")
);



module.exports = db;