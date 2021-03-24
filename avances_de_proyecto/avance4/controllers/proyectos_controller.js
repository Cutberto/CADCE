const session = require('express-session');
const Proyecto = require('../models/proyecto');

exports.inicio = (request, response, next) => {
    console.log(request.session.rol);
    if (request.session.rol == '1'){
        response.render('index_admin');
    }
    else{
        response.render('index');
    }


};

exports.crear_proyecto = (request, response, next) => {
    response.render('crear_proyecto');

};

exports.postProyecto = (request, response, next) => {
    console.log("recibi un post de proyecto");
    const nuevo_proyecto = new Proyecto(request.body.IdProyecto, request.body.nombre, request.body.descripcion, request.body.fechaPlaenada, request.body.fechaLimite, request.body.fechaInicial, request.body.tiempoMax, request.body.tiempoMin);
    nuevo_proyecto.save()
        .then(() => {
            request.session.aviso = "El proyecto " + request.body.nombre + " ha sido creado!"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/inicio');
        }).catch(err => console.log(err));

}

exports.todos = (request, response, next) => {
    response.render('todos_proyectos');

};

exports.modif_proyecto = (request, response, next) => {
    response.render('modif_proyecto');

};

exports.detalleset = (request, response, next) => {
    response.render('detalleset');

};

exports.actividades = (request, response, next) => {
    response.render('actividades');

};