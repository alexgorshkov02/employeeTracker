const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
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
    } else if (selectedOption.option === "View all roles") {
      const [rows] = await connection.execute(`
      SELECT title AS 'Job title',
        role.id AS id,
        department.name AS Department,
        salary AS Salary
      FROM role
        JOIN department ON role.department_id = department.id;
      `);

      console.table(rows);
    } else if (selectedOption.option === "View all employees") {
      // THEN I am presented with a formatted table
      // showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
      const [rows] = await connection.execute(`
      SELECT emp.id AS 'Employee ID',
        emp.first_name AS 'First Name',
        emp.last_name AS 'Last Name',
        rol.title AS 'Job Title',
        dep.name AS Department,
        rol.salary AS Salary,
        CONCAT(man.first_name, ' ', man.last_name) AS Manager
      FROM employee emp
        JOIN role rol ON emp.role_id = rol.id
        JOIN department dep ON rol.department_id = dep.id
        LEFT JOIN employee man ON emp.manager_id = man.id
        ORDER BY emp.id;
        `);
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
