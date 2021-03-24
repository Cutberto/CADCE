const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdProyecto, nombre, descripcion, fechaPlaenada, fechaLimite, fechaInicial, tiempoMax, tiempoMin) {
       this.IdProyecto = IdProyecto;
       this.nombre = nombre;
       this.descripcion = descripcion;
       this.fechaPlaenada = fechaPlaenada;
       this.fechaLimite = fechaLimite;
       this.fechaInicial = fechaInicial;
       this.tiempoMax = tiempoMax;
       this.tiempoMin = tiempoMin;

    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
       // return bcrypt.hash(this.contraseña, 12)
         //   .then((password_encriptado) => {
                return db.execute(
                    'INSERT INTO empleado (IdProyecto, nombre, descripcion, fechaPlaenada, fechaLimite, fechaInicial, tiempoMax, tiempoMin)) VALUES (?, ?, ?, ?, ?, ?,?,?)',
                    [ this.IdProyecto ,this.nombre,this.descripcion ,this.fechaPlaenada, this.fechaLimite,this.fechaInicial , this.tiempoMax , this.tiempoMin    ]
                );
          //  }).catch(err => console.log(err));  
    }

    static fetchOne(IdProyecto) {
        return db.execute('SELECT * FROM proyecto WHERE IdProyecto=?', [IdProyecto]);
    }


}
