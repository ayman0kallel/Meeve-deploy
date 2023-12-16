import bcrypt from 'bcrypt';
import db from '../config/db.js'
import jwt from "jsonwebtoken";


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
      res.status(201).json({ message: 'User added to the database.'});
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

    const accessToken = jwt.sign({id: user.id}, "MeeveSecretKey");
    // Return a success message or the JWT token to the client
    res.status(200).json({
      message: 'Login successful',
      id: user.id,
      email:user.email,
      firstname: user.firstname,
      accessToken,
    });
    
    
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (userId) => {
  try {

    // Exécuter la requête pour récupérer les informations de l'utilisateur
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

    if (rows.length > 0) {
      // Si des données sont trouvées, retourner les informations de l'utilisateur
      return rows[0];
    } else {
      // Si aucun utilisateur n'est trouvé avec cet ID
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId; // Récupère l'ID de l'utilisateur depuis req.userId

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Renvoie les informations de l'utilisateur
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};







