import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import meetsRoutes from './routes/meets.js';
import db from './models/db.js';
//import { createUserTable } from './models/userModel.js'; // Import the createUserTable function correctly

const app = express();
const PORT = 5000;

// Call the createUserTable function to create the 'users' table
// createUserTable(); // Corrected function call

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRoutes);

//app.use('/meets', meetsRoutes);

app.get('/', (req, res) => {
    res.send('Hello from homepage');
})

// Les meets
app.get("/meets", (req, res) => {
    const q = "SELECT * FROM meets INNER JOIN sports ON meets.sport_id = sports.id_sport"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/meet", (req,res) => {

    const { sport_id, date, time, location, author_id } = req.body;

    if (!sport_id || !date || !time || !location || !author_id) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    const q = "INSERT INTO meets (`sport_id`,`date`, `time`, `location`, `author_id`) VALUES (?, ?, ?, ?, ?)"
    const values = [sport_id, date, time, location, author_id];

    db.query(q, values, (err,data) => {
        if(err) return res.json(err);
        return res.json("meet has been created");
    })
})

// Les sports
app.get("/sports", (req,res) => {
    const q = "SELECT * FROM sports"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


// swipe
app.post('/swipe',(req,res) => {
    const {meetId, userId, direction} = req.body

    try {
        let q = '';
        let values = [];

        if(direction == 'left') {

        } else if(direction == 'right') {
            q = 'INSERT INTO usermeets (meet_id, user_id, direction) VALUES (?, ?, ?)';
            values = [meetId, userId, direction];

            db.query(q, values, (err,data) => {
                if(err) return res.json(err)
                return res.json(data)
            })
        }
        return res.status(200).json({ message: 'Swipe successful' });  
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
