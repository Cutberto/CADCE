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
        return db.execute('INSERT INTO tarea (nombre, fase, dificultad) VALUES ( ?, ?, ?)',
                          [ this.nombre, this.IdFase, this.dificultad]
        );
    }

    //cu 18
    actualizar() {
        return db.execute(
            "UPDATE tarea SET  nombre=?, fase =?, dificultad=? WHERE IdTarea =? ",
            [ this.nombre, this.IdFase, this.dificultad, this.IdTarea]
            );
    }
    // IdCasoDeUso lo recibe como parametro del request (se maneja en tarea_controller/postNuevaTarea)
    asignarConCasoDeUso(IdCasoDeUso) {
        return db.execute(
            "INSERT INTO casodeuso_tarea (IdTarea, IdCasoDeUso) VALUES ((SELECT IdTarea FROM tarea WHERE nombre = ?),?) ",
            [ this.nombre, IdCasoDeUso]
            );
    }
    

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM tarea');
    }

    static fetchTareasOfCaso(IdCasoDeUso) {
                            //consulta verificada, brinda las tareas correspondientes a cada caso de uso
        return db.execute('SELECT * FROM tarea WHERE IdTarea IN (SELECT IdTarea FROM casodeuso_tarea where IdCasoDeUso =?)', [IdCasoDeUso] );
    }
    
    static fetchOne(IdTarea) {
        return db.execute('SELECT * FROM tarea WHERE IdTarea=?', [IdTarea]);
    }

}