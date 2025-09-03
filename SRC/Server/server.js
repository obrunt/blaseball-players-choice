var mysql = require('mysql2');

//creating connection to the SQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blaseball_database"
});

//If the connection works, then error, otherwise say connected
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//api stuff begins
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//creating a static path
app.use('/', express.static(path.join(__dirname, "..", 'client')));
const router = express.Router();
router.use(express.json());

//middleware for logging
app.use((req,res,next) => {//for all routes
    console.log(`${req.method} request for ${req.url}`)
    next();
});