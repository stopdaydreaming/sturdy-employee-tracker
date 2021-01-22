const mysql = require("mysql");
const inquirer = require("inquirer");
//npm package for ascii text art
const figlet = require('figlet');

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

//ascii text art
figlet('Employee Manager', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

const init = () => {
    inquirer.prompt([
        {
            name
        }
    ])
}

const exit = () => {
    connection.end();
}