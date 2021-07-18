const connectToDatabase = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Menu = require("./lib/Menu");
let connection;

const viewAllDepartments = async () => {
  const [rows] = await connection.execute(
    `SELECT * from department ORDER BY id`
  );
  console.table(rows);
};

const viewAllRoles = async () => {
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
};

const viewAllEmployees = async () => {
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
};

const addDepartment = async () => {
  const { department } = await inquirer.prompt(Menu.addDepartment());

  const [results] = await connection.execute(
    `INSERT INTO department (name) VALUES (?);`,
    [department]
  );
  console.log(
    `You added ${results.affectedRows} new department with an id of ${results.insertId}`
  );
};

const addRole = async () => {
  const [rows] = await connection.execute(`SELECT * from department`);
  const existingDepartmentsNames = rows.map((item) => item.name);

  const { roleName, salary } = await inquirer.prompt(Menu.addRole());

  const { department } = await inquirer.prompt(
    Menu.selectDepartment(existingDepartmentsNames)
  );

  const [row] = await connection.execute(
    `SELECT id from department where name =?`,
    [department]
  );

  // Expect only the first object because the departments qre unique
  const departmentID = row[0].id;

  const [results] = await connection.execute(
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`,
    [roleName, salary, departmentID]
  );

  console.log(
    `You added ${results.affectedRows} new role with an id of ${results.insertId}`
  );
};

const addEmployee = async () => {
  // Getting first and last names
  const { firstName, lastName } = await inquirer.prompt(Menu.addName());

  // Getting a role ID START
  const [rowsRoles] = await connection.execute(`SELECT title, id from role`);

  const existingRoles = rowsRoles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });

  const { roleId } = await inquirer.prompt(Menu.selectRole(existingRoles));
  // Getting a role ID END

  // Getting a manager ID START
  const [rowsEmployees] = await connection.execute(
    `SELECT first_name, last_name, id from employee`
  );

  const existingEmployees = rowsEmployees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  const noManagerOption = {
    name: `"No manager assigned"`,
    value: null,
  };
  existingEmployees.splice(0, 0, noManagerOption);

  const { managerId } = await inquirer.prompt(
    Menu.selectManager(existingEmployees)
  );
  // Getting a manager ID END

  // Inserting a new record to employee table START
  const [results] = await connection.execute(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
    [firstName, lastName, roleId, managerId]
  );

  console.log(
    `You added ${results.affectedRows} new employee with an id of ${results.insertId}`
  );
  // Inserting a new record to employee table END
};

const updateEmployeeRole = async () => {
  // Getting a employee ID START
  const [rowsEmployees] = await connection.execute(
    `SELECT first_name, last_name, id from employee`
  );

  const existingEmployees = rowsEmployees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });

  const { employeeId } = await inquirer.prompt(
    Menu.selectEmployee(existingEmployees)
  );
  // Getting a employee ID END

  // Getting a role ID START
  const [rowsRoles] = await connection.execute(`SELECT title, id from role`);

  const existingRoles = rowsRoles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });

  const { roleId } = await inquirer.prompt(Menu.selectRole(existingRoles));
  // Getting a role ID END

  // Updating a role of the selected user START
  const [results] = await connection.execute(
    `UPDATE employee SET role_id = ? WHERE id = ?;`,
    [roleId, employeeId]
  );

  if (results.serverStatus === 2 && results.changedRows === 1) {
    console.log(`The role has been updated.`);
  } else if (results.serverStatus === 2 && results.changedRows === 0) {
    console.log(`The employee already has the selected role.`);
  } else {
    console.log(`An error has occurred.`);
  }
  // Updating a role of the selected user END
};

const mainMenu = async () => {
  try {
    // Get a menu option from a user
    const { option } = await inquirer.prompt(Menu.mainMenu());

    switch (option) {
      case "View all departments":
        await viewAllDepartments();
        break;
      case "View all roles":
        await viewAllRoles();
        break;
      case "View all employees":
        await viewAllEmployees();
        break;
      case "Add a department":
        await addDepartment();
        break;
      case "Add a role":
        await addRole();
        break;
      case "Add an employee":
        await addEmployee();
        break;
      case "Update an employee role":
        await updateEmployeeRole();
        break;
      default:
        console.log("No option has been selected")
    }

    mainMenu();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const init = async () => {
  try {
    connection = await connectToDatabase();
    console.log("Database connected.");
    mainMenu();
  } catch (err) {
    console.log("Error connecting to database.", err);
  }
};

init();
