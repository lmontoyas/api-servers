// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET all students
app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "students": rows });
    });
});

// GET a single student by id
app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

// POST a new student
app.post('/students', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    db.run('INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)', 
    [firstname, lastname, gender, age], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "student_id": this.lastID });
    });
});

// PUT update a student by id
app.put('/student/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, gender, age } = req.body;
    db.run('UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?', 
    [firstname, lastname, gender, age, id], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ updatedID: id });
    });
});

// DELETE a student by id
app.delete('/student/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
