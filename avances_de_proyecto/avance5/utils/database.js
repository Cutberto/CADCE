const mysql = require('mysql2');
/* // Credenciales de Gcloud SQL
const pool = mysql.createPool({
    host: '35.184.142.250',
    user: 'root',
    database: 'cadce_test',
    password: 'cadce2021'
});
*/




const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cadce_test',
    password: ''
});




module.exports = pool.promise();