import db from '../config/db.js'; // Import the database connection

export const createMeetTable = async () => {
  try {
    const createMeetTableQuery = `
      CREATE TABLE IF NOT EXISTS meets (
        id int NOT NULL AUTO_INCREMENT,
        sport_id int DEFAULT NULL,
        date date DEFAULT NULL,
        time time DEFAULT NULL,
        location varchar(255) DEFAULT NULL,
        author_id int DEFAULT NULL,
        PRIMARY KEY (id),
        KEY sport_id (sport_id),
        KEY author_id (author_id),
        CONSTRAINT meets_ibfk_1 FOREIGN KEY (sport_id) REFERENCES sports (id_sport),
        CONSTRAINT meets_ibfk_2 FOREIGN KEY (author_id) REFERENCES users (id)
      )
    `;

    // Execute the query using the promise-based interface
    const [results] = await db.execute(createMeetTableQuery);

    console.log('Meet table created:', results);
  } catch (error) {
    console.error('Error creating meet table:', error);
  }
};









