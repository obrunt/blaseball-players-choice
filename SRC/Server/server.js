var mysql = require('mysql2');

//creating connection to the SQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blaseball"
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


// defining test to get all players 
app.get('/database/players', (req, res) => {
    const { id } = req.query;

    const query = `SELECT * FROM players WHERE id = ?`;

    con.query(query, [id], (error, results) => {
        if (error){
            console.error('failed to fetch players from database:', error);
            res.status(500).json({ error: 'failed to fetch players'})
        } else if(results.affectedRows === 0) {
            res.status(404).json({ message: `No players found by user: ${id}` });
        } else {
            //document.getElementById("_before_current").innerText = results;

            res.status(200).json(results);
        }
    })
});







app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});