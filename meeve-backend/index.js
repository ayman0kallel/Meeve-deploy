import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './routes/userRoutes.js'
import db from './config/db.js'
import { createUserTable } from './models/userModel.js'; 
import { createMeetTable } from './models/meetModel.js';
import { createSportTable } from './models/sportModel.js';
import jwt from "jsonwebtoken";
import { getUserProfile } from './controllers/userController.js';


const app = express();
const PORT = 5000;


async function createDB() {
    createUserTable(); 
    createSportTable();
    await createMeetTable();
}

createDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Hello from homepage');
})

// Les meets

app.get("/meets", async (req, res) => {
    const q = "SELECT * FROM meets INNER JOIN sports ON meets.sport_id = sports.id_sport";
    try {
      const [meets] = await db.execute(q);
      res.json(meets);
    } catch (error) {
      console.error('Error fetching meets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

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
app.get("/sports", async (req, res) => {
    try {
      const [sports] = await db.execute('SELECT * FROM sports');
      res.json(sports);
    } catch (error) {
      console.error('Error fetching sports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  export const verifyTokenAndGetUserId = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
  
    jwt.verify(token, 'MeeveSecretKey', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.userId = decodedToken.id; // Récupère l'ID de l'utilisateur depuis le token
      next();
    });
  };

  app.get('/profile', verifyTokenAndGetUserId, getUserProfile);

  


/*
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
}) */

app.listen(PORT, () => 
console.log(`Server Running on port: http://localhost:${PORT}`)
);
