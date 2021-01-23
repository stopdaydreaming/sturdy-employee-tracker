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
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeByRole();
          break;

        case "Update Employee Manager":
          updateEmployeeByManager();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

const viewAll = () => {
  // console.log("view all");
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, data) => {
    if(err) throw err;
    console.table(data);
    init();
  })
}

const viewByDept = () => {
  // console.log("view by departments");
  const query = `SELECT * FROM departments`;
  connection.query(query, (err, data) => {
    if(err) throw err;
    console.table(data);
    init();
  })
};

const viewByManager = () => {
  //console.log("view by manager");
  const query = `SELECT * FROM roles`;
  connection.query(query, (err, data) => {
    if(err) throw err;
    console.table(data);
    init();
  })
};

const addEmployee = () => {
  //console.log("add employee");
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    const employees = data.map((employees) => {
      return {
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id,
      };
    });
    const query = `SELECT * FROM roles`;
    connection.query(query, (err, data) => {
      if (err) throw err;
      const roles = data.map((roles) => {
        return {
          name: roles.title,
          value: roles.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the new employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the new employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is the new employee's role?",
            name: "role",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is the new employee's manager?",
            name: "manager",
            choices: employees,
          },
        ])
        .then(({ first_name, last_name, role, manager }) => {
          const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`;
          connection.query(query, [first_name, last_name, role, manager], (err, data) => {
              if (err) throw err;
              init();
            }
          );
        });
    });
  });
};

const removeEmployee = () => {
  console.log("remove employee");
};

const updateEmployeeByRole = () => {
  console.log("update employee by role");
};

const updateEmployeeByManager = () => {
  console.log("update employee by role");
};

const exit = () => {
  console.log("Goodbye!");
  connection.end();
};

