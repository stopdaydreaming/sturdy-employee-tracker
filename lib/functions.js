const connection = require("../db/connection");
// const inquirer = require("inquirer");
const init = require("./init");

const viewAll = () => {
  console.log("view all employees");
  // const query = `SELECT * FROM employees;`

  // connection.query(query, (err, data) => {
  //   if (err) throw err;
  //   console.table(data);
  //   init();
  // });
  init();
};

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

module.exports = { viewAll, viewByDept, viewByManager, addEmp, removeEmp, updEmpByRole, exit };
