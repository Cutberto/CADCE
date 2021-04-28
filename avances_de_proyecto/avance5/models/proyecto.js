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
                    ' INSERT INTO proyecto (nombre, descripcion, fechaPlaneada, fechaLimite, fechaInicial, estado) VALUES (?,?,?,?,?,?)',
                    [this.nombre,this.descripcion ,this.fechaplaneada, this.fechaLimite,this.fechaInicial ,  'Activo'  ]
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

    static actualizarWbsGlobal(Dificultad, horas) {
     
        return db.execute(
            //UPDATE `wbs` SET `TiempoEstimado` = '1' WHERE `wbs`.`Dificultad` = 1
            'UPDATE wbs SET TiempoEstimado = ? WHERE Dificultad = ?', [ horas, Dificultad   ]

            );
    }


    darDeAltaTiempos(nombre, descripcion){
        return db.execute(
            'INSERT INTO proyecto_wbs (IdProyecto, "1", "2", "3", "5", "8", "13") VALUES ( (SELECT IdProyecto FROM proyecto WHERE nombre = ? AND descripcion =? ) ,0,0,0,0,0,0) ', 
            [nombre, descripcion]

        );

        

    }

    static fectchDificultad(dificultad, IdProyecto){
        return db.execute('SELECT "?" FROM proyecto_wbs WHERE IdProyecto = ?', [dificultad, IdProyecto]   );
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM proyecto ORDER BY estado, fechaInicial');
    }
    

    static fetchOne(idProyecto) {
       // return db.execute('SELECT *, DATE_FORMAT(fechaInicial, "%d-%m-%Y")AS fecha_inicial, DATE_FORMAT(fechaPlaneada, "%d-%m-%Y")AS fecha_planeada, DATE_FORMAT(fechaLimite, "%d-%m-%Y")AS fecha_limite FROM proyecto WHERE IdProyecto=?', [idProyecto]);
        return db.execute('SELECT vista_proyecto_tareas.IdProyecto, vista_proyecto_tareas.nombre, vista_proyecto_tareas.descripcion, DATE_FORMAT(vista_proyecto_tareas.fechaPlaneada, "%d-%m-%Y")AS fecha_planeada, DATE_FORMAT(vista_proyecto_tareas.fechaLimite, "%d-%m-%Y")AS fecha_limite, DATE_FORMAT(vista_proyecto_tareas.fechaInicial, "%d-%m-%Y")AS fecha_inicial,  vista_proyecto_tareas.estado, vista_proyecto_tareas.totales, vista_proyecto_tareas.terminadas, vista_estimacion_tiempo_proyecto.TiempoTotal, vista_proyecto_tareas.TiempoInvertido FROM vista_proyecto_tareas LEFT JOIN vista_estimacion_tiempo_proyecto ON vista_proyecto_tareas.IdProyecto = vista_estimacion_tiempo_proyecto.IdProyecto WHERE vista_proyecto_tareas.IdProyecto = ? ORDER BY estado, fechaInicial '
        ,  [idProyecto]  )    
    }
     //esta funcion regresa la cantidad de tareas terminadas por cada iteracion
    static fetchProgresoIteraciones (IdProyecto){ 
        return db.execute ("SELECT tarea.IdProyecto, casodeuso.iteracion, COUNT(CASE WHEN tarea.Status = 'Done' THEN 1 END) AS 'TareasTerminadas', COUNT(CASE WHEN tarea.Status != 'Done' THEN 1 END) AS 'TareasPendientes', COUNT(tarea.Status) as 'TareasTotales' FROM tarea, casodeuso_tarea, casodeuso WHERE casodeuso_tarea.IdTarea = tarea.IdTarea AND casodeuso.IdCasoDeUso = casodeuso_tarea.IdCasoDeUso AND tarea.IdProyecto = ? GROUP BY casodeuso.iteracion, tarea.IdProyecto",[IdProyecto]);




    }
    
    static eliminarProyecto(idProyecto){
        return db.execute('UPDATE proyecto SET estado = ? WHERE IdProyecto = ?', ['Finalizado', idProyecto]);
    }    

    static fetchProyectosConHoras(){ //consulta que permite ver todos los datos incluyendo la suma de horas de cada tarea del proyecto
        //return db.execute('SELECT vista_proyecto_tareas.IdProyecto, vista_proyecto_tareas.nombre, vista_proyecto_tareas.descripcion, vista_proyecto_tareas.fechaPlaneada, vista_proyecto_tareas.fechaLimite, vista_proyecto_tareas.fechaInicial, vista_proyecto_tareas.tiempoMax, vista_proyecto_tareas.tiempoMin, vista_proyecto_tareas.estado, vista_proyecto_tareas.totales, vista_proyecto_tareas.terminadas, vista_estimacion_tiempo_proyecto.TiempoTotal FROM vista_proyecto_tareas, vista_estimacion_tiempo_proyecto WHERE vista_proyecto_tareas.IdProyecto = vista_estimacion_tiempo_proyecto.IdProyecto ORDER BY estado, fechaInicial');
        return db.execute('SELECT vista_proyecto_tareas.IdProyecto, vista_proyecto_tareas.nombre, vista_proyecto_tareas.descripcion, vista_proyecto_tareas.fechaPlaneada, vista_proyecto_tareas.fechaLimite, vista_proyecto_tareas.fechaInicial, vista_proyecto_tareas.estado, vista_proyecto_tareas.totales, vista_proyecto_tareas.terminadas, vista_estimacion_tiempo_proyecto.TiempoTotal, TIMESTAMPDIFF(DAY, NOW(), vista_proyecto_tareas.fechaLimite) AS Tiempo FROM vista_proyecto_tareas LEFT JOIN vista_estimacion_tiempo_proyecto ON vista_proyecto_tareas.IdProyecto = vista_estimacion_tiempo_proyecto.IdProyecto ORDER BY estado, fechaInicial');
    }
    static fetchWBS() {
        return db.execute('SELECT * FROM wbs' );
    }

    //Regresa todas las columnas de la tabla de airtable en su estado actual de la db
    static fetchVistaAirtable(IdProyecto) {
         return db.execute('SELECT * FROM airtable_view WHERE IdProyecto = ?' ,[IdProyecto]   );
        //return db.execute("SELECT tarea.nombre AS 'Tarea', casodeuso.nombre AS 'Caso de uso', casodeuso.iteracion AS 'Iteración', tarea.fase AS 'Fase de desarrollo', tarea.Status, tarea.TiempoReal AS 'Tiempo de completado' FROM tarea, casodeuso, casodeuso_tarea WHERE tarea.IdTarea = casodeuso_tarea.IdTarea AND  casodeuso.IdCasoDeUso = casodeuso_tarea.IdCasoDeUso AND tarea.IdProyecto = ?        ", [IdProyecto]    );
}
    static fetchConteoIteraciones(IdProyecto) {
        return db.execute( "SELECT COUNT(iteracion) as 'conteo' FROM iteracion WHERE IdProyecto = ?"  ,[IdProyecto]);
    }
 
    static fetchIteraciones(IdProyecto){
        return db.execute("SELECT iteracion, DATE_FORMAT(FechaFinalizacion, '%d-%m-%Y') as 'FechaFinalizacion' FROM `iteracion` WHERE IdProyecto = ?", [IdProyecto]);
    }

    static crearIteracion(iteracion, IdProyecto, fechaFinalizacion){
        return db.execute("INSERT INTO iteracion (iteracion,IdProyecto,FechaFinalizacion) VALUES (?,?,?)", [iteracion, IdProyecto, fechaFinalizacion]);
    }

    static fetchValorCosto(iteracion){
        return db.execute("SELECT iteracion, DATE_FORMAT(iteracion.FechaFinalizacion, '%d-%m-%Y') as 'FechaFinalizacion', (select sum(tarea.TiempoReal) from casodeuso, iteracion, tarea WHERE iteracion.iteracion = casodeuso.iteracion GROUP BY iteracion.iteracion) as accTiempoReal, wbs.TiempoEstimado FROM iteracion, tarea, wbs, casodeuso_tarea, proyecto WHERE iteracion.IdProyecto = proyecto.IdProyecto GROUP BY iteracion.iteracion; ", [IdProyecto]);
    }
    
}
