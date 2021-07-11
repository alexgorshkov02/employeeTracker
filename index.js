const db = require("./db/connection");

// Establish DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});
