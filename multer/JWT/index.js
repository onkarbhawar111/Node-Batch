// index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const users = require("./users.js");
const authenticateToken = require("./middleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Protected Route
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
