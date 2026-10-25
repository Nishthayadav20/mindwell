// db/sqlite.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Existing tables
    db.run(`CREATE TABLE IF NOT EXISTS moodEntries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT NOT NULL,
      sentiment INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS journalEntries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry TEXT NOT NULL,
      sentiment INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create the challenges table and insert tasks
    db.run(`CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day INTEGER NOT NULL,
      task TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error("Error creating challenges table:", err.message);
      } else {
        console.log("Challenges table created or already exists.");

        // Insert sample challenges
        const challenges = [
          [1, 'Go to bed early tonight'],
          [2, 'Write down three things you’re grateful for'],
          [3, 'Spend 10 minutes meditating'],
          // Add more challenges for days 4 to 30
          [30, 'Reflect on your month and write a summary']
        ];

        // Check if challenges already exist before inserting
        db.all(`SELECT COUNT(*) AS count FROM challenges`, [], (err, rows) => {
          if (err) {
            console.error("Error checking challenges:", err.message);
          } else if (rows[0].count === 0) {
            const stmt = db.prepare('INSERT INTO challenges (day, task) VALUES (?, ?)');
            challenges.forEach(([day, task]) => stmt.run(day, task));
            stmt.finalize();
            console.log("Challenges inserted successfully.");
          } else {
            console.log("Challenges already exist.");
          }
        });
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS userChallenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      day INTEGER NOT NULL,
      proof TEXT,
      status TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error("Error creating userChallenges table:", err.message);
      } else {
        console.log("UserChallenges table created or already exists.");
      }
    });
  });
}

module.exports = db;
