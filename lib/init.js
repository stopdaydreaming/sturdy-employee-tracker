const inquirer = require("inquirer");
// const db = require("../db/connection");

//import functions
const {
  viewAll,
  viewByDept,
  viewByManager,
  addEmp,
  removeEmp,
  updEmpByRole,
  exit
} = require("../lib/functions");

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Update Employee Roles",
          "Exit"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAll();
          break;

        case "View All Employees By Department":
          viewByDept();
          break;

        case "View All Employees By Manager":
          viewByManager();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Remove Employee":
          removeEmp();
          break;

        case "Update Employee Role":
          updEmpByRole();
          break;

        case "Update Employee Manager":
          updEmpByManager();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

module.exports = init;
