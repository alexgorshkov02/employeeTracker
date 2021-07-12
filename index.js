const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require('console.table');
const Menu = require("./lib/Menu");

// Establish DB connection
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Database connected.");
// });

const init = () => {
  mainMenu();
};

const mainMenu = async () => {
  try {
    // Get an option from a user
    const selectedOption = await inquirer.prompt(Menu.mainMenu());
    console.log(selectedOption);

    // const request = new DBRequests(selectedOption.option);

    // get the client
    const mysql = require("mysql2/promise");
    // create the connection
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "testpass1",
      database: "employees",
    });

    if (selectedOption.option === "View all departments") {
      const [rows] = await connection.execute(`SELECT * from department`);
      console.table(rows);
    }

    test();
    mainMenu();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const test = () => {
  console.log(`TEST`);
};

init();
