const session = require('express-session');
const Tarea = require('../models/tarea');

exports.getNuevaTarea = (request, response, next) => {
    const casodeusoid = request.params.casodeuso_id;
    response.render('crear_tarea', {
        titulo: 'Nueva Tarea',
        rol: request.session.rol,
        IdCasoDeUso: casodeusoid,
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
            
            nueva_tarea.asignarConCasoDeUso(request.body.IdCasoDeUso)
            .then(() =>{
                response.redirect('/proyectos/todos'); //Poner aqui una ruta hacia proyectos/casosdeuso/ProyectoID
            })

            
            //response.redirect('/casosdeuso/todos');
        }).catch(err => console.log(err));

}


exports.getActualizarTarea = (request, response, next) => {
    const idTarea = request.params.tarea_id;
    Tarea.fetchOne(idTarea)
        .then(([rows, fieldData]) => {
            response.render('modif_tarea', { 
                rol: request.session.rol,
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
    console.log("recibi un post actualizar de tarea");
    console.log(request.body);
    const actualizar_tarea = new Tarea(request.body.IdTarea, request.body.nombre, request.body.IdFase, request.body.dificultad);
    actualizar_tarea.actualizar()
        .then(() => {
            request.session.aviso = "Tarea " + request.body.nombre + " ha sido actualizada"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/inicio'); //redirigir hacia la el caso de uso correspondiente
        }).catch(err => console.log(err));

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
