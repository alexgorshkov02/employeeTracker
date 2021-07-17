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

  static selectManager(arrayEmployee) {
    console.log("test1", arrayEmployee);
    return [
      {
        type: "list",
        name: "manager",
        message: "Please choose a manager for the new employee:",
        choices: arrayEmployee
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
