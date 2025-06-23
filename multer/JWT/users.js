// users.js
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("admin123", 10); // Sync for simplicity

const users = [
  {
    id: 1,
    username: "admin",
    password: hashedPassword, // hashed password
  },
];

module.exports = users;


// Login -- server validation -- server generaes token -- client stores token -- with request client sends the token --  server verifies token and gives response
