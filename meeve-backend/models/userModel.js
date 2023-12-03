/*import db from './db.js'; // Import the database connection

export const createUserTable = async () => {
  try {
    // SQL query to create the 'users' table
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;

    // Execute the query using the promise-based interface
    const [results] = await db.execute(createUserTableQuery);

    console.log('User table created:', results);
  } catch (error) {
    console.error('Error creating user table:', error);
  }
}; */

