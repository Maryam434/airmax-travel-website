const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maryam@333$', 
  database: 'traveldb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected!');
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err); // 👈 Yeh zaroor add karo to see actual MySQL error
      return res.send('Login failed');
    }
    res.send('Login saved successfully');
  });
});


app.post('/book', (req, res) => {
  const { place_name, guests, arrival_date, leaving_date } = req.body;

  const sql = 'INSERT INTO bookings (place_name, guests, arrival_date, leaving_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [place_name, guests, arrival_date, leaving_date], (err, result) => {
    if (err) return res.send('Booking failed');
    res.send('Booking saved successfully');
  });
});
