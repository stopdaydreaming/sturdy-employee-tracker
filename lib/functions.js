const db = require("../db/connection");

const viewAll = () => {
  //   console.log(db);

  connection.query("SELECT * FROM employees;", (err, data) => {
    if (err) throw err;
    const arrayOfItems = data.map(employee => {
      return {
        first: employee.first_name,
        last: employee.last_name,
        role: employee.role_id,
        manager: employee.manager_id
      };
    });
    console.table(arrayOfItems);
  });
};

module.exports = { viewAll };
