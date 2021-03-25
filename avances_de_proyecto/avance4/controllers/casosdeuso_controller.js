const CasoDeUso = require('../models/casodeuso');

exports.getNuevoCasoDeUso = (request, response, next) => {
    response.render('crear_casodeuso', {
        titulo: 'Nuevo CasoDeUso',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postNuevoCasoDeUso = (request, response, next) => {
    const nuevo_casodeuso = new CasoDeUso(request.body.IdCasoDeUso_cu, request.body.nombre_cu, request.body.descripcion_cu, request.body.IdProyecto_cu, request.body.dificultad_cu);
    nuevo_casodeuso.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_casodeuso='+nuevo_casodeuso.nombre+'; HttpOnly']);
            response.redirect('/casosdeuso');
        }).catch(err => console.log(err));

}


exports.getCasoDeUso = (request, response, next) => {
    const idCasoDeUso = request.params.casodeuso_id;
    CasoDeUso.fetchOne(idCasoDeUso)
        .then(([rows, fieldData]) => {
            response.render('casosdeuso', { 
                lista_casosdeuso: rows, 
                titulo: 'CasosDeUso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};




exports.get = (request, response, next) => {
    

    console.log(request.ultimoCasoDeUsoAgregado);

    CasoDeUso.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('casosdeuso', { 
                lista_casosdeuso: rows, 
                titulo: 'CasosDeUso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

