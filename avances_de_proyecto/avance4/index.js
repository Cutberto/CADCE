const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const csrf = require('csurf');
const csrfProtection = csrf();
app.use(bodyParser.urlencoded({extended: false}));
const proyectos = require('./routes/proyectos');
const login = require('./routes/login');

//const mensaje = require ('./routes/mensaje');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'qwertyasdfzxcv', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use('/proyectos', proyectos);

app.use('/login',login);

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
//app.use(csrfProtection); 




                   
app.use( (request, response, next) => {
    //response.statusCode = 404;
    response.status(404);
    response.send('404: Recurso no encontrado'); //Manda la respuesta
} );

app.listen(3000);