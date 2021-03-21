const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdEmpleado, nombre, apellidos, correo, contraseña, IdRol) {
        this.IdEmpleado = IdEmpleado;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contraseña = contraseña;
        this.IdRol = IdRol;
      
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.contraseña, 12)
            .then((password_encriptado) => {
                return db.execute(
                    'INSERT INTO empleado (IdEmpleado, nombre, apellidos, correo, contraseña, IdRol) VALUES (?, ?, ?, ?, ?, ?)',
                    [this.IdEmpleado , this.nombre, this.apellidos, this.correo, password_encriptado, this.IdRol   ]
                );
            }).catch(err => console.log(err));  
    }

    static fetchOne(IdEmpleado) {
        return db.execute('SELECT * FROM empleado WHERE IdEmpleado=?', [IdEmpleado]);
    }

}

/* esto todavia jalaba ok si ok
module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, username, password) {
        this.nombre = nombre;
        this.username = username;
        this.password = password;
      
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_encriptado) => {
                return db.execute(
                    'INSERT INTO usuarios (username, nombre, password) VALUES (?, ?, ?)',
                    [this.username, this.nombre, password_encriptado]
                );
            }).catch(err => console.log(err));  
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM usuarios WHERE username=?', [username]);
    }

}


*/