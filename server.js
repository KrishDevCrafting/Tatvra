const exprss = require('express');
const db = require('./Config/db');
const app = exprss();





app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3000, () => console.log("Server running 🚀"));

    




