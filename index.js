const db = require("./db/connection");
const inquirer = require("inquirer");
const Menu = require("./lib/Menu")

// Establish DB connection
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Database connected.");
// });

const  init = async () => {
  try {
    // Get an option from a user
    const selectedOption = await inquirer.prompt(Menu.mainMenu());
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

init();
