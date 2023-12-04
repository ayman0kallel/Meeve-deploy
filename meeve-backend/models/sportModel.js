import db from '../config/db.js'; // Import the database connection

export const createSportTable = async () => {
  try {
    const createSportTableQuery = `
      CREATE TABLE IF NOT EXISTS sports (
        id_sport int NOT NULL AUTO_INCREMENT,
        name varchar(255) DEFAULT NULL,
        image varchar(255) DEFAULT NULL,
        PRIMARY KEY (id_sport)
      )
    `;

    // Execute the query using the promise-based interface
    const [results] = await db.execute(createSportTableQuery);

    console.log('Sport table created:', results);
  } catch (error) {
    console.error('Error creating sport table:', error);
  }
};