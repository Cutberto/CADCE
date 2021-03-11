const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');




exports.get = (request, response, next) => {

    response.render('login', {
        titulo: 'Inicia sesión',
        error: request.session.error,
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.post = (request, response, next) => {
    request.session.error = "";
    const username = request.body.usuario;
    console.log(username);
    Usuario.fetchOne(username)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {
                request.session.error = "El usuario y/o contraseña no coinciden";
                console.log ("usuario y contra no coinciden");
                response.redirect('/login/');
            } else {
                //console.log("pass en request: " + request.body.password);
               //console.log("pass en db: " + rows[0].password);
                bcrypt.compare(request.body.password, rows[0].password)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.usuario = request.body.usuario;
                            return request.session.save(err => {
                                response.redirect('/proyectos/inicio');
                                console.log("exito en login");
                            });
                        }
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/login/');
                        console.log("error no hay match");
                    }).catch(err => {
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/login/');
                        console.log ("error en .catch");
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        console.log('Logout');
        response.redirect('/login/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};


exports.getRegister = (request, response, next) => {
    response.render('register', {
        titulo: 'Registra tus datos',
       // csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegister = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.nombre, request.body.usuario, request.body.password);
    nuevo_usuario.save()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.usuario = request.body.usuario;
            response.redirect('/productos');
        }).catch(err => console.log(err));

}