const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
    user: 'root',
    database: 'cadce_test',
    password: ''
  //  host: 'bb8c6tkoblg2qoca2wqb-mysql.services.clever-cloud.com',
   // user: 'uwo0i7fedy6xkesb',
   // database: 'bb8c6tkoblg2qoca2wqb',
   // password: 'EofUZmotE7KtZ5eHhLy4'    
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