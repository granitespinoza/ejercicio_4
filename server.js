const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Get all students
app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ students: rows });
    });
});

// Get student by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ student: row });
    });
});

// Create new student
app.post('/students', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    db.run('INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)', 
    [firstname, lastname, gender, age], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Update student by ID
app.put('/students/:id', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    const id = req.params.id;
    db.run('UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?', 
    [firstname, lastname, gender, age, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

// Delete student by ID
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM students WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
