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
          "Update Employee",
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

        case "Update Employee":
          updateEmployee();
          break;

        case "View All Roles":
          viewByRoles();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

const viewAll = () => {
  // console.log("view all");
  const query = `
  SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as employees, r.title as roles, d.name AS departments, CONCAT(m.first_name, " ", m.last_name) as manager
  FROM employees e
  INNER JOIN roles r ON r.id = e.role_id
  LEFT JOIN departments d ON d.id = r.department_id
  LEFT JOIN employees m ON e.manager_id = m.id;`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

const viewByDept = () => {
  // console.log("view by departments");
  const query = `SELECT name AS departments FROM departments`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

const viewByRoles = () => {
  // console.log("view by roles");
  const query = `SELECT * FROM roles`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

const viewByManager = () => {
  //console.log("view by manager");
  const query = `    
    SELECT e.id, CONCAT(e.first_name, " ", e.last_name) as employees, CONCAT(m.first_name, " ", m.last_name) as manager
    FROM employees e
    INNER JOIN roles r ON r.id = e.role_id
    LEFT JOIN employees m ON e.manager_id = m.id;`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
};

const addEmployee = () => {
  //console.log("add employee");
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    const employees = data.map(employees => {
      return {
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id
      };
    });
    const query = `SELECT * FROM roles`;
    connection.query(query, (err, data) => {
      if (err) throw err;
      const roles = data.map(roles => {
        return {
          name: roles.title,
          value: roles.id
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the new employee's first name?",
            name: "first_name"
          },
          {
            type: "input",
            message: "What is the new employee's last name?",
            name: "last_name"
          },
          {
            type: "list",
            message: "What is the new employee's role?",
            name: "role",
            choices: roles
          },
          {
            type: "list",
            message: "Who is the new employee's manager?",
            name: "manager",
            choices: employees
          }
        ])
        .then(({ first_name, last_name, role, manager }) => {
          const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`;
          connection.query(
            query,
            [first_name, last_name, role, manager],
            (err, data) => {
              if (err) throw err;
              init();
            }
          );
        });
    });
  });
};

const removeEmployee = () => {
  // console.log("remove employee");
  const choices = [
    "Gary Snail",
    "Jerry Seinfeld",
    "Mikal Piston",
    "Homer Simpson",
    "Marge Simpson",
    "Bart Simpson"
  ];
  inquirer
    .prompt({
      type: "list",
      name: "deleteEmp",
      message: "Which employee would you like to delete?",
      choices: choices
    })
    .then(function(answer) {
      console.log(answer.employee);
      const query = "DELETE FROM employees WHERE ?";
      connection.query(query, { deleteEmp: answer.employee }, (err, data) => {
        if (err) throw err;
        console.log(res.data + " employee deleted!\n");
        init();
      });
    });
};

const updateEmployee = () => {
  console.log("update employee by role");
  console.log("update employee by manager");
  const queryEmployee = `SELECT * FROM employee`;
  connection.query(queryEmployee, (err, data) => {
    if (err) throw err;
    const employees = data.map(employee => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      };
    });
    const queryRole = `SELECT * FROM role`;
    connection.query(queryRole, (err, data) => {
      if (err) throw err;
      const roles = data.map(role => {
        return {
          name: role.title,
          value: role.id
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to update?",
            name: "employee",
            choices: employees
          },
          {
            type: "list",
            message: "What do you want the employee's role to be?",
            name: "role",
            choices: roles
          }
        ])
        .then(({ employee, role }) => {
          const queryString = `UPDATE employee SET role_id = ? WHERE id = ?`;
          connection.query(queryString, [role, employee], (err, data) => {
            if (err) throw err;
            clear();
            init();
          });
        });
    });
  });
};

const exit = () => {
  console.log("Goodbye!");
  connection.end();
};
