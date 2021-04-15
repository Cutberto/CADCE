const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, apellidos, correo, contraseña, IdRol) {
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
                    'INSERT INTO empleado (nombre, apellidos, correo, contraseña, IdRol) VALUES (?, ?, ?, ?, ?)',
                    [this.nombre, this.apellidos, this.correo, password_encriptado, this.IdRol   ]
                );
            }).catch(err => console.log(err));  
    }

    static fetchOne(IdEmpleado) {
        return db.execute('SELECT * FROM empleado WHERE IdEmpleado=?', [IdEmpleado]);
    }

    static getCorreo(correo) {
        return db.execute('SELECT * FROM empleado WHERE correo=?', [correo]);
    }    

    static getRole(IdEmpleado){
        return db.execute('SELECT IdRol FROM empleado WHERE IdEmpleado=?', [IdEmpleado]);
    }

}
