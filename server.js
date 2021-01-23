const mysql = require("mysql");
const inquirer = require("inquirer");
//npm package for ascii text art
const figlet = require("figlet");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "HotTo$$y",
  database: "employees_db"
});

// connection.connect();
connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id: ${connection.threadId}`);
  init();
});

//ascii text art
figlet("Employee Manager", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

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

const viewAll = () => {
  console.log("view all");
  init();
}

const viewByDept = () => {
  console.log("view by department");
  IntersectionObserver();
};

const viewByManager = () => {
  console.log("view by manager");
};

const addEmp = () => {
  console.log("add employees");
};

const removeEmp = () => {
  console.log("remove employee");
};

const updEmpByRole = () => {
  console.log("update employee by role");
};

const exit = () => {
  console.log("Goodbye!");
  connection.end();
};

