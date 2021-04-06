const db = require('../utils/database');


module.exports = class Tarea {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    // Tarea(request.body.IdTarea, request.body.Nombre, request.body.Fase, request.body.IdDificultad, request.body.TiempoMax, request.body.TiempoMin);

    constructor(IdTarea, nombre, IdFase, dificultad) {
        this.IdTarea = IdTarea;
        this.nombre = nombre;
        this.IdFase = IdFase;
        this.dificultad = dificultad;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log(this.IdTarea, this.nombre, this.IdFase, this.dificultad);
        return db.execute('INSERT INTO tarea (IdTarea, nombre, IdFase, dificultad) VALUES (?, ?, ?, ?)',
                          [this.IdTarea, this.nombre, this.IdFase, this.dificultad]
        );
    }

    //cu 18
    actualizar() {
        return db.execute(
            "UPDATE tarea SET  nombre=?, IdFase =?, dificultad=? WHERE IdTarea =? ",
            [ this.nombre, this.IdFase, this.dificultad, this.IdTarea]
            );
    }
 
    
// hasta aqui llevo 

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM casodeuso');
    }
    
    static fetchOne(IdCasoDeUso) {
        return db.execute('SELECT * FROM casodeuso WHERE IdCasoDeUso=?', [IdCasoDeUso]);
    }

}