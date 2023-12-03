
import bcrypt from 'bcrypt';
import db from '../models/db.js';
import jwt from 'jsonwebtoken';

let users = [];

export const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(emailCheckQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: 'Email address already in use.' });
      }

      // Email doesn't exist, proceed to create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertUserQuery, [firstname, lastname, email, hashedPassword], (insertErr, result) => {
        if (insertErr) {
          console.error('Error adding user:', insertErr);
          return res.status(500).json({ error: 'Failed to add user to the database.' });
        }

        if (result.affectedRows === 1) {
          res.status(201).json({ message: 'User added to the database.' });
        } else {
          res.status(500).json({ error: 'Failed to add user to the database.' });
        }
      });
    });
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

// Create a new controller function for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?;", email, (err, result) => {
      if(err) {
        res.send({err: err});
      }

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if(response) {
            const id = result[0].id
            const token = jwt.sign({id}, "jwtMeeve", {
              expiresIn: 300,
            })

            res.json({auth: true, token: token, result: result});
          } else {
            res.json({auth: false, message: "Wrong email/password combination"});
          }
        });
      } else {
        res.json({auth: false, message: "no user exists"});
      }
    }
  );
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
  // Do not expose the password in the response
  const { password, ...userWithoutPassword } = foundUser;
  res.status(200).json(userWithoutPassword);
};

// Delete a user by ID
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }
  users.splice(index, 1);
  res.status(200).json({ message: `User with id ${id} deleted.` });
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password } = req.body;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // Update user fields
  if (firstname) {
    user.firstname = firstname;
  }

  if (lastname) {
    user.lastname = lastname;
  }

  if (email) {
    // Check if the new email already exists
    const emailExists = users.some((u) => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(409).json({ error: 'Email address already in use.' });
    }
    user.email = email;
  }

  if (password) {
    // Hash the new password before updating
    user.password = await bcrypt.hash(password, 10);
  }

  res.status(200).json({ message: `User with id ${id} updated` });
};
