const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '35.184.142.250',
    user: 'root',
    database: 'cadce_test',
    password: 'cadce2021'
});

module.exports = pool.promise();


/*
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'natdev',
    password: ''
});


*/