const express = require('express');
const db = require('./Config/db');
const app = express();

app.use(express.json());

// 👇 Home route
app.get("/", (req, res) => {
  res.send("Hello Server 🚀");
});

// 👇 Routes
app.use('/auth', require('./Routes/auth'));

// 👇 Get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
}); 
app.listen(3000, () => console.log("Server running 🚀"));