const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: false}));
const proyectos = require('./routes/proyectos');
const casosdeuso = require('./routes/casosdeuso');
const login = require('./routes/login');
const tareas = require('./routes/tareas');


//const mensaje = require ('./routes/mensaje');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'qwertyasdfzxcv', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use('/proyectos', proyectos);
app.use('/casosdeuso', casosdeuso);
app.use('/tareas', tareas);
app.use('/login',login);

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
//app.use(csrfProtection); 

app.get('/', (request, response, next) => {
    console.log(request.session);
    response.redirect('/login');
});


                   
app.use( (request, response, next) => {
    //response.statusCode = 404;
    response.status(404);
    response.send('404: Recurso no encontrado'); //Manda la respuesta
} );

app.listen(3000);