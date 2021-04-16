const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, descripcion, fechaplaneada, fechaLimite, fechaInicial, IdProyecto) {
       this.nombre = nombre;
       this.descripcion = descripcion;
       this.fechaplaneada = fechaplaneada;
       this.fechaLimite = fechaLimite;
       this.fechaInicial = fechaInicial;
       this.IdProyecto = IdProyecto;


    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        /*console.log('ejecutando save proyecto con parametros: ' );
        console.log( 'id'+this.IdProyecto +'nombre' + this.nombre+ 'descripcion'+this.descripcion +'inicial'+this.fechaplaneada+'limite'+ this.fechaLimite +'planeada'+this.fechaInicial +'0'+'0');*/
       // return bcrypt.hash(this.contraseña, 12)
         //   .then((password_encriptado) => {
                return db.execute(
                    ' INSERT INTO proyecto (nombre, descripcion, fechaPlaneada, fechaLimite, fechaInicial, tiempoMax, tiempoMin, estado) VALUES (?,?,?,?,?,?,?,?)',
                    [this.nombre,this.descripcion ,this.fechaplaneada, this.fechaLimite,this.fechaInicial , '0', '0', 'Activo'    ]
                );
          //  }).catch(err => console.log(err));  
    }
    
    actualizar(IdProyecto) {
        console.log('los parametros del update son: '+this.nombre, this.descripcion, this.fechaplaneada, this.fechaLimite, this.IdProyecto)
        return db.execute(
            
            'UPDATE proyecto SET nombre=?, descripcion=?, fechaplaneada=?, fechaLimite=? WHERE IdProyecto=?',
            [this.nombre, this.descripcion, this.fechaplaneada, this.fechaLimite, IdProyecto]

            );
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM proyecto ORDER BY estado, fechaInicial');
    }
    

    static fetchOne(idProyecto) {
        return db.execute('SELECT * FROM proyecto WHERE IdProyecto=?', [idProyecto]);
    }

    static fetchProyectosConHoras(){
        return db.execute('SELECT * FROM vista_proyecto_tareas ORDER BY estado, fechaInicial');
    }


}
