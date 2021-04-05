const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdProyecto, nombre, descripcion, fechaplaneada, fechaLimite, fechaInicial) {
       this.IdProyecto = IdProyecto;
       this.nombre = nombre;
       this.descripcion = descripcion;
       this.fechaplaneada = fechaplaneada;
       this.fechaLimite = fechaLimite;
       this.fechaInicial = fechaInicial;


    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        /*console.log('ejecutando save proyecto con parametros: ' );
        console.log( 'id'+this.IdProyecto +'nombre' + this.nombre+ 'descripcion'+this.descripcion +'inicial'+this.fechaplaneada+'limite'+ this.fechaLimite +'planeada'+this.fechaInicial +'0'+'0');*/
       // return bcrypt.hash(this.contraseña, 12)
         //   .then((password_encriptado) => {
                return db.execute(
                    ' INSERT INTO proyecto (IdProyecto, nombre, descripcion, fechaPlaneada, fechaLimite, fechaInicial, tiempoMax, tiempoMin) VALUES (?,?,?,?,?,?,?,?)',
                    [ this.IdProyecto ,this.nombre,this.descripcion ,this.fechaplaneada, this.fechaLimite,this.fechaInicial , '0', '0'    ]
                );
          //  }).catch(err => console.log(err));  
    }
    
    actualizar() {
        return db.execute(
            'UPDATE proyecto SET nombre=?, descripcion=?, fechaplaneada=?, fechaLimite=? WHERE IdProyecto=?',[this.nombre, this.descripcion, this.fechaplaneada, this.fechaLimite, this.IdProyecto]

            );
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM proyecto');
    }
    

    static fetchOne(idProyecto) {
        return db.execute('SELECT * FROM proyecto WHERE IdProyecto=?', [idProyecto]);
    }


}
