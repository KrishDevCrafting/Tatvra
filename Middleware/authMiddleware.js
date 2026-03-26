const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: "Access Denied 🛑! No token provided." });

  try {
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    
    const verified = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: "Invalid Token 🚫!" });
  }
};

module.exports = { verifyToken };