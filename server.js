const express = require("express");
const app = express();
const db = require("./Config/db");

app.use(express.json());

// 👇 Home route
app.get("/", (req, res) => {
  res.send("Hello Server 🚀");
});

// 👇 Routes — har ek alag hoti hai!
app.use("/auth", require("./Routes/auth"));
app.use("/users", require("./Routes/users"));

app.listen(3000, () => console.log("Server running on port 3000 🚀"));
