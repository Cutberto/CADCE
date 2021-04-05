module.exports = (request, response, next) => {
    if (request.session.rol != 1) { //rol 1 = admin,   rol 2 = usuario normal
        return response.redirect('/proyectos/todos');
    }
    next();
}