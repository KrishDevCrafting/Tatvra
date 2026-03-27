require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// 👇 Home route
app.get("/", (req, res) => {
  res.send("Hello Server 🚀");
});

// 👇 Routes — har ek alag hoti hai!
app.use("/auth", require("./Routes/auth"));
app.use("/users", require("./Routes/users"));
app.use("/products", require("./Routes/products"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
