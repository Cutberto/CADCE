const db = require('../utils/database');


module.exports = class Tarea {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    // Tarea(request.body.IdTarea, request.body.Nombre, request.body.Fase, request.body.IdDificultad, request.body.TiempoMax, request.body.TiempoMin);

    constructor(IdTarea, nombre, IdFase, dificultad, IdProyecto, TiempoEstimado) {
        this.IdTarea = IdTarea;
        this.nombre = nombre;
        this.IdFase = IdFase;
        this.dificultad = dificultad;
        this.IdProyecto = IdProyecto;
        this.TiempoEstimado = TiempoEstimado;
    }

    save() {
        console.log("guardando tarea en db con parametros: ")
        console.log(this.nombre, this.IdFase, this.dificultad, this.IdProyecto, this.TiempoEstimado);
        return db.execute('INSERT INTO tarea (nombre, fase, dificultad, IdProyecto, TiempoEstimado) VALUES ( ?, ?, ?, ?, ?)',
            [this.nombre, this.IdFase, this.dificultad, this.IdProyecto, this.TiempoEstimado]
        );
    }

    //cu 18
    actualizar() {
        return db.execute(
            "UPDATE tarea SET  nombre=?, fase =?, dificultad=?, TiempoEstimado=? WHERE IdTarea =? ",
            [this.nombre, this.IdFase, this.dificultad, this.TiempoEstimado, this.IdTarea]
        );
    }
    // IdCasoDeUso lo recibe como parametro del request (se maneja en tarea_controller/postNuevaTarea)
    asignarConCasoDeUso(IdCasoDeUso) {
        return db.execute(
            "INSERT INTO casodeuso_tarea (IdTarea, IdCasoDeUso) VALUES ((SELECT IdTarea FROM tarea WHERE nombre = ?),?) ",
            [this.nombre, IdCasoDeUso]
        );
    }


    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM tarea');
    }

    static fetchTareasOfCaso(IdCasoDeUso) {
        //consulta verificada, brinda las tareas correspondientes a cada caso de uso
        return db.execute('SELECT * FROM tarea WHERE IdTarea IN (SELECT IdTarea FROM casodeuso_tarea where IdCasoDeUso =?)', [IdCasoDeUso]);
    }

    static fetchTareasOfProyecto(IdProyecto) {
        return db.execute('SELECT * FROM tarea WHERE IdProyecto =?', [IdProyecto]);
    }

    static fetchOne(IdTarea) {
        return db.execute('SELECT * FROM tarea WHERE IdTarea=?', [IdTarea]);
    }

    static EliminarConexionTareasCasoDeUso(idTarea) {
        return db.execute('DELETE FROM casodeuso_tarea WHERE IdTarea=?', [idTarea]);
    }

    static EliminarTarea(idTarea) {
        return db.execute('DELETE FROM tarea WHERE IdTarea=?', [idTarea]);
    }

    //devuelve el total de tareas que hay en un proyecto
    static fetchTotalPorProyecto(IdProyecto) {
        return db.execute('SELECT COUNT(IdTarea) AS conteo FROM tarea WHERE IdProyecto = ? ', [IdProyecto]);
    }
    static fetchDonePorProyecto(IdProyecto) {
        return db.execute('SELECT COUNT(IdTarea) AS conteo FROM tarea WHERE IdProyecto = 1 AND Status = "Done"', [IdProyecto]);
    }

    static fetchWbs() {
        return db.execute('SELECT * FROM wbs');
    }

    static updateTareasConAirtable(nombreTarea, Status, TiempoReal) {
        return db.execute("UPDATE tarea SET   Status=?, TiempoReal=? WHERE nombre =?", [Status, TiempoReal, nombreTarea]);
    }

    static fetchTiemposOfTareas(IdProyecto) {
        return db.execute('SELECT nombre, wbs.TiempoEstimado, TiempoReal FROM tarea, wbs WHERE tarea.dificultad = wbs.Dificultad AND IdProyecto =?', [IdProyecto] );
    }

    static fetchTiemposOfTareas(IdProyecto) {
        return db.execute('SELECT nombre, wbs.TiempoEstimado, TiempoReal FROM tarea, wbs WHERE tarea.dificultad = wbs.Dificultad AND IdProyecto =?', [IdProyecto] );
    }
}