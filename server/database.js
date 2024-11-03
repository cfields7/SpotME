const sqlite3 = require('sqlite3').verbose();

const DB_FILE = "./data/spotME-records.db";

// Sqlite 3 Database
let db;

// Initialize Database from File
const init = () => {
  console.log("Initializing Database...");

  // Connect to database file
  console.log("Connecting to database file " + DB_FILE);
  db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      console.error("Error opening database from file: ", err);
    } else {
      console.log("Connected to database file successfully");
    }
  });

  // Create a "users" table, if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone TEXT,
      instagram TEXT,
      snapchat TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created or already exists");
    }
  });
}

// Add a new user
const addUser = (userData) => {
  console.log("Adding user with data ", userData);
  return new Promise((resolve, reject) => {
    const { firstName, lastName, image, email, phone, instagram, snapchat } = userData;
    db.run(
      "INSERT INTO users (firstName, lastName, image, email, phone, instagram, snapchat) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, image, email, phone, instagram, snapchat],
      function(err) {
        if (err) {
          console.error('Error inserting user:', err);
          reject(err);
        } else {
          const updatedUserData = getUser(this.lastID);
          resolve(updatedUserData);
        }
      }
    );
  });
};

// Get a user by id
const getUser = (id) => {
  console.log('Getting user with id ', id);
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error getting user by id:', err);
        reject(err);
      } else {
        console.log('Found user:', row);
        resolve(row);
      }
    });
  });
};

module.exports = {
  init,
  addUser,
  getUser
};