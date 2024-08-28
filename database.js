// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('students.sqlite', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        db.run(`CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            gender TEXT NOT NULL,
            age TEXT
        )`, (err) => {
            if (err) {
                console.log('Table already exists.');
            }
        });
    }
});

module.exports = db;
