const db = require('../utils/database');


module.exports = class CasoDeUso {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdCasoDeUso, nombre, descripcion, IdProyecto, IdDificultad) {
        this.IdCasoDeUso = IdCasoDeUso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.IdProyecto = IdProyecto;
        this.IdDificultad = IdDificultad;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log(this.IdCasoDeUso, this.nombre, this.descripcion, this.IdProyecto, this.IdDificultad, 'NULL', 'NULL', '1');
        return db.execute('INSERT INTO casodeuso (IdCasoDeUso, nombre, descripcion, IdProyecto, IdDificultad, tiempoMax, tiempoMin, iteracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                          [this.IdCasoDeUso, this.nombre, this.descripcion, this.IdProyecto, this.IdDificultad, 'NULL', 'NULL', '1']
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM casodeuso');
    }
    
    static fetchOne(IdCasoDeUso) {
        return db.execute('SELECT * FROM casodeuso WHERE IdCasoDeUso=?', [IdCasoDeUso]);
    }

}