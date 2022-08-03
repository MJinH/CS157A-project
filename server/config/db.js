const mysql = require('mysql')


const db = mysql.createConnection({
    host: 'USER NAME',
    user: 'USER ROOT',
    password: 'USER PASSWORD',
    database: 'DATABASE NAEM'
})


module.exports = db;