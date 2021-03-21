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
    const username = request.body.IdEmpleado;
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
                bcrypt.compare(request.body.contraseña, rows[0].contraseña)
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
    console.log("recibi un post de register");
    const nuevo_usuario = new Usuario(request.body.IdEmpleado, request.body.nombre, request.body.apellidos, request.body.correo, request.body.contraseña, request.body.IdRol);
    nuevo_usuario.save()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.usuario = request.body.IdEmpleado;
            request.session.rol = request.body.IdRol;
            response.redirect('/proyectos/inicio');
        }).catch(err => console.log(err));

}