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
      const [rows] = await connection.execute(`SELECT * from department ORDER BY id`);

      console.table(rows);
    } else if (selectedOption.option === "View all roles") {
      const [rows] = await connection.execute(`
      SELECT title AS 'Job title',
        role.id AS id,
        department.name AS Department,
        salary AS Salary
      FROM role
        JOIN department ON role.department_id = department.id
        ORDER BY role.id;
      `);

      console.table(rows);
    } else if (selectedOption.option === "View all employees") {
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
    } else if (selectedOption.option === "Add a department") {
      const { department } = await inquirer.prompt(Menu.addDepartment());
      console.log(department);

      const [results] = await connection.execute(
        `INSERT INTO department (name) VALUES (?);`,
        [department]
      );
      console.log(
        `You added ${results.affectedRows} new department with an id of ${results.insertId}`
      );
    } else if (selectedOption.option === "Add a role") {
      const [rows] = await connection.execute(`SELECT * from department`);
      console.log(rows);
      const existingDepartmentsNames = rows.map((item) => item.name);
      console.log(existingDepartmentsNames);

      const { roleName, salary } = await inquirer.prompt(Menu.addRole());
      console.log(roleName, salary);

      const { department } = await inquirer.prompt(
        Menu.selectDepartment(existingDepartmentsNames)
      );
      console.log(department);

      const [row] = await connection.execute(
        `SELECT id from department where name =?`,
        [department]
      );
      //   Expect only the first object because the departments qre unique
      console.log(row[0].id);
      const departmentID = row[0].id;

      const [results] = await connection.execute(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`,
        [roleName, salary, departmentID]
      );

      console.log(
        `You added ${results.affectedRows} new role with an id of ${results.insertId}`
      );


    } else if (selectedOption.option === "Add an employee") {
      const [rows] = await connection.execute(`SELECT employee.first_name, employee.last_name, employee.id from employee`);

      console.log(rows);
      const existingEmployees = rows.map((item) => {
        return {
        name: item.first_name + " " + item.last_name,
        value: item.id
      }
        });
        const noManagerOption = {
          name: "No manager assigned",
          value: null
        }
      existingEmployees.splice(0, 0, noManagerOption);
      console.log(existingEmployees);

      const { manager } = await inquirer.prompt(
        Menu.selectManager(existingEmployees)
      );
      console.log(manager);


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
