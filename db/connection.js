const util = require("util");
const mysql = require("mysql");
const init = require("../lib/init");

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

connection.query = util.promisify(connection.query);

module.exports = connection;
