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
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, data) => {
    if (err) throw err;
    const employees = data.map(employees => {
      return {
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "delete",
          message: "Which employee would you like to delete?",
          choices: employees
        }
      ])
      .then(({ employees }) => {
        const query = `DELETE FROM employees WHERE id = ?;`;
        connection.query(query, [employees], (err, data) => {
          if (err) throw err;
          console.log("Employee deleted!");
          init();
        });
      });
  });
};

const updateEmployee = () => {
  // console.log("update employee by role");
  // console.log("update employee by manager");
  const queryOne = `SELECT * FROM employees`;
  connection.query(queryOne, (err, data) => {
    if (err) throw err;
    const employee = data.map(employees => {
      return {
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id
      };
    });
    const queryTwo = `SELECT * FROM roles`;
    connection.query(queryTwo, (err, data) => {
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
            type: "list",
            message: "Which employee would you like to update?",
            name: "employee",
            choices: employee
          },
          {
            type: "list",
            message: "What is the employees new role?",
            name: "role",
            choices: roles
          }
        ])
        .then(({ employees, roles }) => {
          const query = `UPDATE employees SET role_id = ? WHERE id = ?`;
          connection.query(query, [employees, roles], (err, data) => {
            if (err) throw err;
            init();
          });
        });
    });
  });
};

const exit = () => {
  console.log("Logging off... Goodbye!");
  connection.end();
};
