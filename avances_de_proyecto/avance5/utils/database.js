const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cadce_test_new',
    password: ''
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