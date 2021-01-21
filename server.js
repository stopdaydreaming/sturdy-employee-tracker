const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HotTo$$y",
    database:""
});

connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id: ${connection.threadId}`);
    init();
});

const init() {

}

const exit = () => {
    connection.end();
}