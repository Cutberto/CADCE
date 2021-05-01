const db = require('../utils/database');


module.exports = class CasoDeUso {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad, iteracion) {
        this.IdCasoDeUso = IdCasoDeUso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.IdProyecto = IdProyecto;
        this.dificultad = dificultad;
        this.iteracion = iteracion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log( this.nombre, this.descripcion, this.IdProyecto, this.dificultad, 'NULL', 'NULL', this.iteracion);
        return db.execute('INSERT INTO casodeuso ( nombre, descripcion, IdProyecto, dificultad, iteracion) VALUES (?, ?, ?, ?, ?)',
                          [ this.nombre, this.descripcion, this.IdProyecto, this.dificultad,  this.iteracion]
        );
    }

    //cu 10
    actualizar() {
        return db.execute(
            "UPDATE casodeuso SET nombre=?, descripcion=?, IdProyecto =?, dificultad=?, iteracion=? WHERE IdCasoDeUso =? ",
            [ this.nombre, this.descripcion, this.IdProyecto, this.dificultad, this.iteracion, this.IdCasoDeUso ]
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
        return db.execute('SELECT * FROM casodeuso WHERE IdProyecto=? ORDER BY iteracion ASC', [IdProyecto]);
    }
    
    static EliminarCasoDeUso(idCasoDeUso){
        return db.execute('DELETE FROM casodeuso WHERE IdCasoDeUso=?', [idCasoDeUso]);
    }
    

    
    static EliminarConexionTareasCasoDeUso(idCasoDeUso){
        return db.execute('DELETE FROM casodeuso_tarea WHERE IdCasoDeUso=?', [idCasoDeUso]);
    }    

    static SelectValorPlaneado(idProyecto){
        return db.execute('SELECT tarea.IdProyecto, casodeuso.iteracion, DATE_FORMAT(iteracion.FechaFinalizacion, "%d-%m-%Y") AS FechaFinalizacion, SUM(wbs.TiempoEstimado) as ValorPlaneado FROM tarea, wbs, casodeuso_tarea, casodeuso, iteracion WHERE tarea.dificultad = wbs.Dificultad AND casodeuso_tarea.IdTarea = tarea.IdTarea AND casodeuso_tarea.IdCasoDeUso = casodeuso.IdCasoDeUso AND tarea.IdProyecto = ? AND iteracion.iteracion = casodeuso.iteracion AND iteracion.IdProyecto = tarea.IdProyecto GROUP BY casodeuso.iteracion', [idProyecto]);
    }

    static SelectCostoReal(idProyecto){
        return db.execute('SELECT tarea.IdProyecto, casodeuso.iteracion, iteracion.FechaFinalizacion, SUM(tarea.TiempoReal) as CostoReal FROM tarea, wbs, casodeuso_tarea, casodeuso, iteracion WHERE tarea.dificultad = wbs.Dificultad AND casodeuso_tarea.IdTarea = tarea.IdTarea AND casodeuso_tarea.IdCasoDeUso = casodeuso.IdCasoDeUso AND tarea.IdProyecto = ? AND iteracion.iteracion = casodeuso.iteracion AND iteracion.IdProyecto = tarea.IdProyecto GROUP BY casodeuso.iteracion', [idProyecto]);
    }

    static SelectValorGanado(idProyecto){
        return db.execute('SELECT tarea.IdProyecto, casodeuso.iteracion, iteracion.FechaFinalizacion, SUM(wbs.TiempoEstimado) as ValorGanado FROM tarea, wbs, casodeuso_tarea, casodeuso, iteracion WHERE tarea.dificultad = wbs.Dificultad AND casodeuso_tarea.IdTarea = tarea.IdTarea AND casodeuso_tarea.IdCasoDeUso = casodeuso.IdCasoDeUso AND tarea.IdProyecto = ? AND iteracion.iteracion = casodeuso.iteracion AND tarea.status LIKE "Done" AND iteracion.IdProyecto = tarea.IdProyecto GROUP BY casodeuso.iteracion', [idProyecto]);
    }
}