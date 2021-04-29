const session = require('express-session');
const Proyecto = require('../models/proyecto');
const CasoDeUso = require('../models/casodeuso');
const Tarea = require('../models/tarea');
const airtable_controller = require('../controllers/airtable_controller');
var Airtable = require('airtable');
var AsyncAirtable = require('asyncairtable');
//var base = new Airtable({apiKey: 'keyIytlxEjOWlvP1H'}).base('appfHD8Ikbtk78MrM');
var asyncbase = new AsyncAirtable("keyIytlxEjOWlvP1H" , "appfHD8Ikbtk78MrM");


//funcion original:
exports.inicio = (request, response, next) => {

    Proyecto.fetchProyectosConHoras()
        .then(([rows, fieldData]) => {
            response.render('todos_proyectos_test', { 
                rol: request.session.rol,
                proyectos: rows, 
                titulo: 'Todos los proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//Nuevo caso de uso
exports.getIteraciones = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log("getIteraciones",idProyecto);
    Proyecto.fetchConteoIteraciones(idProyecto)
        .then(([rows, fieldData]) => {
            Proyecto.fetchIteraciones (idProyecto)
            .then(([rows2, fieldData]) => {
               console.log(rows2,"  ", rows); 
                response.render('todas_iteraciones', { 
                    rol: request.session.rol,
                    iteraciones: rows2,
                    conteo: rows,  
                    IdProyecto: idProyecto,
                    titulo: 'Iteraciones del proyecto',
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
        
                })
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.crear_iteracion = (request, response, next) => {
    response.render('crear_iteracion',
        {rol: request.session.rol,
            titulo: 'Crear iteración',
            IdProyecto: request.params.proyecto_id
        }
    );

};

exports.postIteracion = (request, response, next) => {
    console.log("recibi un post de iteracion");
    Proyecto.crearIteracion(request.body.iteracion,request.body.IdProyecto,request.body.FechaFinalizacion)
        .then(() => {

            request.session.aviso = "La iteracion " + request.body.iteracion + " ha sido creada!"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/detalles/'+request.body.IdProyecto);
        }).catch(
            err => {
                console.log(err);
                request.session.error = "La iteracion ya existe en el sistema";
                response.redirect('/proyectos/detalles/'+request.body.IdProyecto);
            }
            
            );

}


exports.crear_proyecto = (request, response, next) => {
    response.render('crear_proyecto',
        {rol: request.session.rol,
            titulo: 'Crear Proyecto'}
    );

};

exports.postProyecto = (request, response, next) => {
    console.log("recibi un post de proyecto");
    const nuevo_proyecto = new Proyecto(request.body.nombre, request.body.descripcion, request.body.fechaplaneada, request.body.fechaLimite, request.body.fechaInicial);
    nuevo_proyecto.save()
        .then(() => {
            //esto crea el registro por default del wbs del proyecto en cero
        // console.log("Dando de alta tiempos en  tabla con parametros "+ request.body.nombre, request.body.descripcion);
        //    nuevo_proyecto.darDeAltaTiempos(request.body.nombre, request.body.descripcion)
        //    .then(()=>{            }        )
            
            request.session.aviso = "El proyecto " + request.body.nombre + " ha sido creado!"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/inicio');
        }).catch(err => console.log(err));

}


exports.postActualizarProyecto = (request, response, next) => {
    console.log("recibi un actualizar de proyecto");
    const actualizar_proyecto = new Proyecto(request.body.nombre, request.body.descripcion, request.body.fechaplaneada, request.body.fechaLimite );
    console.log(request.body.IdProyecto,request.body.nombre, request.body.descripcion, request.body.fechaplaneada, request.body.fechaLimite);
    actualizar_proyecto.actualizar(request.body.IdProyecto)
        .then(() => {
            request.session.aviso = "El proyecto " + request.body.nombre + " ha sido actualizado"; //para mostrar un aviso en la siguiente vista renderizada
            response.redirect('/proyectos/detalles/'+request.body.IdProyecto);
        }).catch(err => console.log(err));

}


exports.getProyecto = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log("getProyecto",idProyecto);
    Proyecto.fetchOne(idProyecto)
        .then(([rows, fieldData]) => {
            response.render('modif_proyecto', { 
                rol: request.session.rol,
                lista_proyectos: rows, 
                titulo: 'Editor de proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getNuevoCaso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log("getnuevoCaso",idProyecto);
    Proyecto.fetchIteraciones(idProyecto)
    .then(([rows, fieldData]) => {  
        response.render('crear_casodeuso', { 
                rol: request.session.rol,
                idProyecto: idProyecto,
                lista_iteraciones: rows, 
                titulo: 'Nuevo caso de uso ',
                isLoggedIn: request.session.isLoggedIn === true ? true : false 
       });
    })
    .catch(err => {
        console.log(err);
    })
    }
        

exports.getDetalles = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log("getDetalles",idProyecto);
    Proyecto.fetchOne(idProyecto)
        .then(([rows, fieldData]) => {
            Proyecto.fetchProgresoIteraciones (idProyecto)
            .then(([rows2, fieldData]) => {
                //Valor Planeado
                CasoDeUso.SelectValorPlaneado(idProyecto)
                .then(([rows3, fieldData]) => {
                    //Costo Real
                    CasoDeUso.SelectCostoReal(idProyecto)
                    .then(([rows4, fieldData]) => {
                        //Valor Ganado
                        CasoDeUso.SelectValorGanado(idProyecto)
                        .then(([rows5, fieldData]) => {

                        valorPlaneadoEJS = rows3;
                        costoRealEJS = rows4;
                        valorGanadoEJS = rows5;
                        console.log("Esto llegó al controlador: " + costoRealEJS);

                response.render('detalles_proyecto', { 
                    rol: request.session.rol,
                    valorGanado: valorGanadoEJS,
                    valorPlaneado: valorPlaneadoEJS,
                    costoReal : costoRealEJS,
                    progreso: rows2,
                    Proyecto: rows,  
                    titulo: 'Detalles del proyecto',
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
        
        })
            .catch(err => {
                console.log(err);
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


exports.getgestionarairtable = (request, response, next) => {
    const IdProyecto = request.params.proyecto_id;

    Proyecto.obtenerLlaves(IdProyecto)
    .then(([rows,fieldData]) => {

        response.render('gestionar_airtable', { 
            rol: request.session.rol,
            IdProyecto: IdProyecto,
            llaves: rows, 
            titulo: 'Gestionar airtable',
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });


    }                     ) 
    .catch(err => { 
        console.log(err);
        response.render('gestionar_airtable', { 
            rol: request.session.rol,
            IdProyecto: IdProyecto, 
            titulo: 'Gestionar airtable',
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });

     })            



};

exports.postGuardarLlaves = (request, response, next) => {
    const IdProyecto = request.body.IdProyecto;
    const apiKey = request.body.apiKey;
    const tableKey = request.body.tableKey;
        Proyecto.guardarLlaves(IdProyecto,apiKey,tableKey)
        .then(([rows,fieldData]) => {

           response.redirect('/proyectos/gestionarAirtable/'+IdProyecto);


        }                     ) 
        .catch(err => { 
            console.log(err);
            response.redirect('/proyectos/gestionarAirtable/'+IdProyecto);
         })            
           
};

exports.getCaso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    
    console.log(request.params);
    CasoDeUso.fetchByProject(idProyecto)
        .then(([rows, fieldData]) => {

                        response.render('todos_casosdeuso', { 
                            rol: request.session.rol,
                            lista_casosdeuso: rows, 
                            titulo: 'Casos de uso'  ,
                            idProyecto: idProyecto,
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
                rol: request.session.rol,
                lista_proyectos: rows, 
                titulo: 'Proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postEliminarProyecto = (request, response) => {
    const idProyecto = request.body.IdProyecto;
    console.log("Id",request.body.IdProyecto)
    Proyecto.eliminarProyecto(idProyecto)
    .then(() => {
        request.session.alerta = "Proyecto eliminado exitosamente";
        response.redirect('/proyectos/inicio');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getWbs = (request, response, next) => {
    Proyecto.fetchWBS()  
        .then(([rows, fieldData]) => {
            response.render('wbs', { 
                rol: request.session.rol,
                lstwbs: rows, 
                titulo: 'WBS'  ,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//dummy
exports.postWbs = (request, response, next) => {

    console.log("POST wbs_tareas ")
    console.log(request.body);
    const dificultades = [1,2,3,5,8,13];
    /*for (i in request.body.Dificultad){
        console.log(request.body.Dificultad[i], request.body.TiempoEstimado[i]); //busca las tareas del proyecto dado
       

    }*/
    for (i in request.body.Dificultad){
        Proyecto.actualizarWbsGlobal(request.body.Dificultad[i], request.body.TiempoEstimado[i]) //busca las tareas del proyecto dado
        .then(([rows, fieldData]) => {
            console.log("update realizado en wbs con valores (dificultad, tiempo)=",request.body.Dificultad[i], request.body.TiempoEstimado[i] );
        })
        .catch(err => {
            console.log(err);
            //response.redirect("proyectos/inicio");
        });

    }
    response.redirect("/proyectos/inicio");
   
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