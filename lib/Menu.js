class Menu {
  static mainMenu() {
    return [
      {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ];
  }

  static addDepartment() {
    return [
      {
        type: "input",
        name: "department",
        message: "Please provide a name for the new department:",
      },
    ];
  }

  static selectDepartment(options) {
    return [
      {
        type: "list",
        name: "department",
        message: "Please choose a department for the new role:",
        choices: options,
      },
    ];
  }

  static addRole() {
    return [
      {
        type: "input",
        name: "roleName",
        message: "Please provide a name for the new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Please provide a salary for the new role:",
        validate: (salaryInput) => {
          if (this.validateNumberValue(salaryInput)) {
            return true;
          } else {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.log("Please enter a salary! (Only numbers are allowed)");
            return false;
          }
        },
      },
    ];
  }

  static addName() {
    return [
      {
        type: "input",
        name: "firstName",
        message: "Please provide the first name for the new employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please provide the last name for the new employee:",
      },
    ];
  }

  static selectRole(arrayRoles) {
    return [
      {
        type: "list",
        name: "roleId",
        message: "Please choose a role for the employee:",
        choices: arrayRoles
      },
    ];
  }

  static selectManager(arrayEmployees) {
    return [
      {
        type: "list",
        name: "managerId",
        message: "Please choose a manager for the new employee:",
        choices: arrayEmployees
      },
    ];
  }

  static selectEmployee(arrayEmployees) {
    return [
      {
        type: "list",
        name: "employeeId",
        message: "Please choose an employee:",
        choices: arrayEmployees
      },
    ];
  }

  // Function to validate a number
  static validateNumberValue(value) {
    const regEx = /^\d+$/;
    return regEx.test(value);
  }
}

module.exports = Menu;
