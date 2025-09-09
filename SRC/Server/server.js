import * as mysql from "mysql2";

//creating connection to the SQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Star74Bucks!",
  database: "blaseball"
});

//If the connection works, then error, otherwise say connected
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//api stuff begins
import * as path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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


import {calculateBattingRating, calculatePitchingRating, calculateBaserunningRating, calculateDefenseRating} from "./player.js";

// defining test to get all players 
app.get('/database/players', (req, res) => {
    const { id } = req.query;

    const query = `SELECT * FROM players WHERE id = ?;`;

    con.query(query, [id], (error, results) => {
        if (error){
            console.error('failed to fetch players from database:', error);
            res.status(500).json({ error: 'failed to fetch players'})
        } else if(results.affectedRows === 0) {
            res.status(404).json({ message: `No players found by user: ${id}` });
        } else {
            const updateQuery = `UPDATE players SET batting_rating = ?, pitching_rating = ?, baserunning_rating = ?, defense_rating = ? WHERE id = ?;`

            con.query(updateQuery, [calculateBattingRating(results[0]), calculatePitchingRating(results[0]),
            calculateBaserunningRating(results[0]), calculateDefenseRating(results[0]), id], (error, results) => {
                if (error){
                    console.error('failed to fetch update database:', error);
                    res.status(500).json({ error: 'failed to change database'})
                } else if(results.affectedRows === 0) {
                    res.status(404).json({ message: `No players updated found` });
                } else {
                    res.status(200).json(results);
                }
            })
        }
    })
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});