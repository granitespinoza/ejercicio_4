import sqlite3 from 'sqlite3';
sqlite3.verbose();

// Crear o abrir la base de datos
const db = new sqlite3.Database('students.sqlite', (err) => {
  if (err) {
    console.error('Could not connect to the database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        gender TEXT NOT NULL,
        age TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Could not create table', err.message);
      }
    });
  }
});

export default db;
