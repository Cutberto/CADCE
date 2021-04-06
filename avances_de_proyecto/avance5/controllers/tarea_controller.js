const session = require('express-session');
const Tarea = require('../models/tarea');

exports.getNuevaTarea = (request, response, next) => {
    response.render('crear_tarea', {
        titulo: 'Nueva Tarea',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};
// constructor(IdTarea, nombre, IdFase, dificultad)
exports.postNuevaTarea = (request, response, next) => {
    console.log("recibi post de nueva tarea");
    console.log(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad);
    const nueva_tarea = new Tarea(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad);
    nueva_tarea.save()   
        .then(() => {

            response.redirect('/casosdeuso/todos');
        }).catch(err => console.log(err));

}


exports.getTarea = (request, response, next) => {
    const idTarea = request.params.tarea_id;
    CasoDeUso.fetchOne(idTarea)
        .then(([rows, fieldData]) => {
            response.render('tarea', { 
                lista_tarea: rows, 
                titulo: 'Tarea',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postActualizarTarea = (request, response, next) => {
    console.log("recibi un actualizar de tarea");
    console.log(request.body);
    const actualizar_tarea = new Tarea(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad);
    actualizar_tarea.actualizar()
        .then(() => {
            request.session.aviso = "Tarea " + request.body.nombre + " ha sido actualizada"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/casosdeuso/todos');
        }).catch(err => console.log(err));

}
exports.getActualizarTarea = (request, response, next) => {
     response.render('modif_tarea');

}

  //hasta aqui llevo   

//    constructor(IdCasoDeUso, nombre, descripcion, IdProyecto, dificultad) {



exports.get = (request, response, next) => {

    CasoDeUso.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('todos_casosdeuso', { 
                lista_casosdeuso: rows, 
                titulo: 'Casos de uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};
