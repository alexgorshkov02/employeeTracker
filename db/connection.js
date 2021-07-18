const mysql = require("mysql2/promise");

const connectToDatabase = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "testpass1",
    database: "employees",
  });

  return connection;
};

module.exports = connectToDatabase;
