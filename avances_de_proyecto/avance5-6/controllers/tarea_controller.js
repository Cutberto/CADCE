const session = require('express-session');
const Tarea = require('../models/tarea');

exports.getTareas = (request, response, next) => {
    let tiempoTareas = [];

    const idCasoDeUso = request.params.casodeuso_id;
    const idProyecto = request.params.proyecto_id;

    Tarea.fetchTareasOfCaso(idCasoDeUso)
        .then(([rows, fieldData]) => {
            Tarea.SelectTiemposOfTareas(idCasoDeUso)
            .then(([rows2, fieldData]) => {
                        tiempoTareas = rows2;
                        console.log(tiempoTareas);
            
                    console.log("Se han cargado los tiempos por tarea");
                    
                    tiempoTareas = rows2;
                    console.log(tiempoTareas);

                    response.render('todas_tareas', { 
                        rol: request.session.rol,
                        lista_tareas: rows, 
                        titulo: 'Tareas del caso de uso',
                        IdCasoDeUso: idCasoDeUso,
                        idProyecto: idProyecto,
                        tiempoTareas : tiempoTareas,
                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
            })
            .catch(err => {
                console.log(err);
            });

    })
    .catch(err => {
        console.log(err);
    });

};

exports.getNuevaTarea = (request, response, next) => {
    const casodeusoid = request.params.casodeuso_id;
    const proyectoid = request.params.proyecto_id;
    response.render('crear_tarea', {

        titulo: 'Nueva Tarea',
        rol: request.session.rol,
        IdCasoDeUso: casodeusoid,
        IdProyecto: proyectoid,
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};
// constructor(IdTarea, nombre, IdFase, dificultad)
exports.postNuevaTarea = (request, response, next) => {
    console.log("recibi post de nueva tarea con parametros:");
    console.log(request.body);
    const nueva_tarea = new Tarea(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad, request.body.IdProyecto);
    nueva_tarea.save()
        .then(() => {
            console.log("save de tarea ejecutado... ejecutando asignacion Con caso de uso");
            nueva_tarea.asignarConCasoDeUso(request.body.IdCasoDeUso)
                .then(() => {
                    response.redirect('/tareas/' + request.body.IdCasoDeUso+'/'+request.body.IdProyecto); 
                })


            //response.redirect('/casosdeuso/todos');
        }).catch(err => console.log(err));

}

//idea para count count = rows[0].count;
exports.getActualizarTarea = (request, response, next) => {
    const idTarea = request.params.tarea_id;
    const IdProyecto = request.params.proyecto_id;
    const IdCasoDeUso = request.params.casodeuso_id;
    Tarea.fetchOne(idTarea)
        .then(([rows, fieldData]) => {
            const title = 'Tarea ' + rows[0].nombre;

            response.render('modif_tarea', {
                rol: request.session.rol,
                lista_tarea: rows,
                idProyecto: rows[0].IdProyecto,
                IdCasoDeUso: IdCasoDeUso,
                titulo: title,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postActualizarTarea = (request, response, next) => {
    console.log("recibi un post actualizar de tarea con parametros:");
    console.log(request.body);
    const actualizar_tarea = new Tarea(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad, request.body.IdProyecto);
    actualizar_tarea.actualizar()
        .then(() => {
            request.session.aviso = "Tarea " + request.body.nombre + " ha sido actualizada"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/tareas/'+ request.body.IdCasoDeUso+'/' + request.body.IdProyecto); //redirigir hacia la el caso de uso correspondiente
        }).catch(err => console.log(err));

}
exports.postEliminarTarea = (request, response) => {
    const idTarea = request.body.IdTarea;
    const idProyecto = request.body.IdProyecto;
    const idcaso = request.body.IdCasoDeUso;
    console.log("Id", request.body.IdTarea)
    Tarea.EliminarConexionTareasCasoDeUso(idTarea)
    Tarea.EliminarTarea(idTarea)
        .then(() => {
            request.session.alerta = "Tarea eliminada exitosamente";
            response.redirect('/tareas/'+idcaso+'/'+idProyecto);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.get = (request, response, next) => {
    
    Tarea.fetchAll()
        .then(([rows, fieldData]) => {
            console.log("fetchAll")
            response.render('todas_tareas', {
                rol: request.session.rol,
                lista_tarea: rows,
                titulo: 'Casos de uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

exports.getDataTiempo = (request, response, next) => {

    Tarea.fetchTiemposOfTareas()
        .then(([rows, fieldData]) => {
            console.log("La función asíncrona está funcionando");
            response.status(200).json(rows);
            })
        .catch(err => {
            console.log(err);
        });
    };

