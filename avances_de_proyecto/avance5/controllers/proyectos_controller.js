const session = require('express-session');
const Proyecto = require('../models/proyecto');
const CasoDeUso = require('../models/casodeuso');
/*
exports.inicio = (request, response, next) => {
    console.log(request.session.rol);
    if (request.session.rol == '1'){
        response.render('index_admin');
    }
    else{
        response.render('index');
    }


}; */

exports.inicio = (request, response, next) => {

    Proyecto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('todos_proyectos_test', { 
                proyectos: rows, 
                titulo: 'Todos los proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.crear_proyecto = (request, response, next) => {
    response.render('crear_proyecto',
        {titulo: 'Crear Proyecto'}
    );

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
            response.redirect('/proyectos/todos');
        }).catch(err => console.log(err));

}


exports.getProyecto = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log("getProyecto",idProyecto);
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


exports.getCaso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    
    console.log(request.params);
    CasoDeUso.fetchByProject(idProyecto)
        .then(([rows, fieldData]) => {
            response.render('todos_casosdeuso', { 
                lista_casosdeuso: rows, 
                titulo: 'Casos de uso'  ,
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

//nuevo cu4
/*
exports.modif_proyecto = (request, response, next) => {
    const get_proyectos = new Proyecto('NULL','NULL','NULL','NULL','NULL','NULL');
    console.log( get_proyectos.fetchAll() );
    response.render('modif_proyecto');

};
*/

/*
router.get('/', function(req, res, next) {

    sql.connect(config).then(() => {
        return sql.query`select Project_Type_Desc from Project_Type`
    }).then(result => {
        console.log(result)
        // Pass the DB result to the template
        res.render('newProject', {dropdownVals: result})
    }).catch(err => {
        console.log(err)
    })
    

});

*/


exports.detalleset = (request, response, next) => {
    response.render('detalleset');

};

exports.actividades = (request, response, next) => {
    response.render('actividades');

};