module.exports = (request, response, next) => {
    if (request.session.rol != 0) { //rol 0 = admin,   rol 1 = usuario normal
        return response.redirect('/proyectos/todos');
    }
    next();
}