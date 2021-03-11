exports.inicio = (request, response, next) => {
    response.render('index');

};

exports.crear_proyecto = (request, response, next) => {
    response.render('crear_proyecto');

};

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