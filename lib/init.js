const inquirer = require("inquirer");
const db = require("../db/connection");
//functions
const { viewAll } = require("../lib/functions");

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
          //function
          break;

        case "View All Employees By Manager":
          //function
          break;

        case "Add Employee":
          //function
          break;

        case "Remove Employee":
          //function
          break;

        case "Update Employee Role":
          //function
          break;

        case "Update Employee Manager":
          //function
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

const exit = () => {
  db.getConnection(function(err, connection) {
    connection.end();
  });
};

module.exports = init;
