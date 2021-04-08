const db = require('../utils/database');


module.exports = class CasoDeUso {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad) {
        this.IdCasoDeUso = IdCasoDeUso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.IdProyecto = IdProyecto;
        this.dificultad = dificultad;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log(this.IdCasoDeUso, this.nombre, this.descripcion, this.IdProyecto, this.dificultad, 'NULL', 'NULL', '1');
        return db.execute('INSERT INTO casodeuso (IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad, tiempoMax, tiempoMin, iteracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                          [this.IdCasoDeUso, this.nombre, this.descripcion, this.IdProyecto, this.dificultad, 'NULL', 'NULL', '1']
        );
    }

    //cu 10
    actualizar() {
        return db.execute(
            "UPDATE casodeuso SET nombre=?, descripcion=?, IdProyecto =?, dificultad=? WHERE IdCasoDeUso =? ",
            [ this.nombre, this.descripcion, this.IdProyecto, this.dificultad, this.IdCasoDeUso]
            );
    }
 
    

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM casodeuso');
    }
    
    static fetchOne(IdCasoDeUso) {
        return db.execute('SELECT * FROM casodeuso WHERE IdCasoDeUso=?', [IdCasoDeUso]);
    }

    static fetchByProject(IdProyecto) {
        return db.execute('SELECT * FROM casodeuso WHERE IdProyecto=?', [IdProyecto]);
    }


}