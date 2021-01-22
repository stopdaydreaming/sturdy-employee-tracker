const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const init = require("./lib/init");

//npm package for ascii text art
const figlet = require("figlet");

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

module.exports = { connection };
