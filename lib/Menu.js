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
}

module.exports = Menu;
