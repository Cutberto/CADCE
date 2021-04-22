const { json } = require('body-parser');
const session = require('express-session');
const CasoDeUso = require('../models/casodeuso');
const Tarea = require('../models/tarea');


exports.getTareas = (request, response, next) => {
    let tiempoTareas = [];
    
    const idCasoDeUso = request.params.casodeuso_id;
    const idProyecto = request.params.proyecto_id;
    
    Tarea.fetchTareasOfCaso(idCasoDeUso)
        .then(([rows, fieldData]) => {
            Tarea.fetchTiemposOfTareas(idProyecto)
            .then(([rows, fieldData]) => {
                    console.log("Se han cargado los tiempos por tarea");
                    
                    tiempoTareas = rows;
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

exports.getNuevoCasoDeUso = (request, response, next) => {
    response.render('crear_casodeuso', {
        rol: request.session.rol,
        titulo: 'Nuevo Caso de uso',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postNuevoCasoDeUso = (request, response, next) => {
    const nuevo_casodeuso = new CasoDeUso(request.body.IdCasoDeUso_cu, request.body.nombre_cu, request.body.descripcion_cu, request.body.IdProyecto_cu, request.body.dificultad_cu, request.body.iteracion_cu);
    nuevo_casodeuso.save()
        .then(() => {

            response.redirect('/proyectos/casosdeuso/'+request.body.IdProyecto_cu);
        }).catch(err => console.log(err));

}


exports.getCasoDeUso = (request, response, next) => {
    const idCasoDeUso = request.params.casodeuso_id;
    console.log(idCasoDeUso);
    console.log(request.params);
    CasoDeUso.fetchOne(idCasoDeUso)
        .then(([rows, fieldData]) => {
            response.render('casosdeuso', {
                rol: request.session.rol, 
                lista_casosdeuso: rows, 
                titulo: 'CasosDeUso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//    constructor(IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad) {

exports.postActualizarCasoDeUso = (request, response, next) => {
    console.log("recibi un actualizar de caso de uso");
    console.log(request.body);
    const actualizar_caso = new CasoDeUso(request.body.IdCasoDeUso_cu, request.body.nombre_cu, request.body.descripcion_cu, request.body.IdProyecto_cu, request.body.dificultad_cu, request.body.iteracion_cu);
    actualizar_caso.actualizar()
        .then(() => {
            request.session.aviso = "Caso de uso " + request.body.nombre + " ha sido actualizado"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/casosdeuso/'+request.body.IdProyecto_cu);
        }).catch(err => console.log(err));

}
exports.getActualizarCasoDeUso = (request, response, next) => {
    // response.render('modif_casodeuso');
    const idCasoDeUso = request.params.casodeuso_id;
    console.log("getActualizarcasodeuso");
    console.log(idCasoDeUso);
    console.log(request.params);
    CasoDeUso.fetchOne(idCasoDeUso)
        .then(([rows, fieldData]) => {
            response.render('modif_casodeuso', { 
                rol: request.session.rol,
                lista_casosdeuso: rows, 
                titulo: 'Modificar caso de uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });

}



exports.postEliminarCasoDeUso = (request, response) => {
    const idCasoDeUso = request.body.IdCasoDeUso;
    console.log("Id",request.body.IdCasoDeUso)
    CasoDeUso.EliminarConexionTareasCasoDeUso(idCasoDeUso)
    CasoDeUso.EliminarCasoDeUso(idCasoDeUso)
    .then(() => {
        request.session.alerta = "Caso de uso eliminado exitosamente";
        response.redirect('/proyectos/inicio');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.get = (request, response, next) => {

    CasoDeUso.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('todos_casosdeuso', { 
                rol: request.session.rol,
                lista_casosdeuso: rows, 
                titulo: 'Casos de uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

