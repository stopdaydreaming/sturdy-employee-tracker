// const mysql = require("mysql");
// const inquirer = require("inquirer");
// const init = require("./lib/init");
const connection = require("./db/connection");

//npm package for ascii text art
const figlet = require("figlet");

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
