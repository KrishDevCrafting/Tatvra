const express = require('express');
const db = require('./Config/db');
const app = express();

app.use(express.json());

// 👇 Home route
app.get("/", (req, res) => {
  res.send("Hello Server 🚀");
});

// 👇 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];

      if (user.password !== password) {
        return res.status(400).json({ message: "Wrong password" });
      }

      res.json({ message: "Login successful ✅" });
    }
  );
});

// 👇 Get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
}); 
app.listen(3000, () => console.log("Server running 🚀"));