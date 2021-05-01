const mysql = require('mysql2');
// // Credenciales de Gcloud SQL
//const pool = mysql.createPool({
//    host: '35.184.142.250',
//    user: 'root',
//    database: 'cadce_test',
//    password: 'cadce2021'
//});



//COLOCAR AQUI CREDENCIALES DE ACCESO DEL SERVIDOR SQL DE DESPLIEGUE =)

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cadce_test',
    password: ''
});




module.exports = pool.promise();