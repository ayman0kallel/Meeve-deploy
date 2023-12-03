import db from '../models/db.js';

export const createMeet = async (req, res) => {
  const { sport, date, time, location, author } = req.body;

  // Check if the email already exists in the database
  const existingMeet = await checkMeetExists(date, time, location);
  if (existingMeet) {
    return res.status(409).json({ error: 'Meet already exists.' });
  }

  try {

    // Insert the meet into the database
    const sql = `
      INSERT INTO meets (sport_id, date, time, location, author_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [sport, date, time, location, author]);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Meet added to the database.' });
    } else {
      res.status(500).json({ error: 'Failed to add meet to the database.' });
    }
  } catch (error) {
    console.error('Error adding meet:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to check if a user with the given email exists
const checkMeetExists = async (date, time, location) => {
  const [rows] = await db.execute('SELECT * FROM meets WHERE date = ?', [date], 'AND time = ?', [time], 'AND location = ?', [location]);
  return rows[0]; // Return the first result or null
};

export const getMeets = (req, res) => {
  const q = "SELECT * FROM meets"
  db.query(q,(err,data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
};