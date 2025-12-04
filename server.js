const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myPassword$12',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM staff', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
