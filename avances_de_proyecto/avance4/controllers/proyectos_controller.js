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
    const nuevo_proyecto = new Proyecto(request.body.IdProyecto, request.body.nombre, request.body.descripcion, request.body.fechaplaneada, request.body.fechaLimite, request.body.fechaInicial);
    nuevo_proyecto.save()
        .then(() => {
            request.session.aviso = "El proyecto " + request.body.nombre + " ha sido creado!"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/inicio');
        }).catch(err => console.log(err));

}


exports.postActualizarProyecto = (request, response, next) => {
    console.log("recibi un actualizar de proyecto");
    const actualizar_proyecto = new Proyecto(request.body.IdProyecto, request.body.nombre, request.body.descripcion, request.body.fechaplaneada, request.body.fechaLimite);
    actualizar_proyecto.actualizar()
        .then(() => {
            request.session.aviso = "El proyecto " + request.body.nombre + " ha sido actualizado"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/inicio');
        }).catch(err => console.log(err));

}


exports.getProyecto = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Proyecto.fetchOne(idProyecto)
        .then(([rows, fieldData]) => {
            response.render('modif_proyecto', { 
                lista_proyectos: rows, 
                titulo: 'Editor de proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};



exports.get = (request, response, next) => {

    Proyecto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('todos_proyectos', { 
                lista_proyectos: rows, 
                titulo: 'Proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
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