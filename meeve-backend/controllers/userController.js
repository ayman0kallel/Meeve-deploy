import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js'

let users = [];
export const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Check if the email already exists in the database
  const existingUser = await checkUserExistsByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email address already in use.' });
  }
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const sql = `
      INSERT INTO users (firstname, lastname, email, password)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [firstname, lastname, email, hashedPassword]);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'User added to the database.', token });
    } else {
      res.status(500).json({ error: 'Failed to add user to the database.' });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to check if a user with the given email exists
const checkUserExistsByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // Return the first result or null
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    // If no user found, return an error
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password from the database
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return a success message or the JWT token to the client
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users
export const getUsers = (req, res) => {
  res.status(200).json(users);
};

// Get a user by ID
export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    return res.status(404).json({ error: 'User not found.' });
  }
  const { password, ...user} = foundUser;
  res.status(200).json(user);
};