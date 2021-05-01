const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const redis = require('redis');
const connectRedis = require('connect-redis');
//let redis_store = require('connect-redis')(session);
const RedisStore = connectRedis(session);

//SUTSTITUIR AQUI LAS CREDENCIALES DE ACCESO DE SU ALMACENAMIENTO REDIS
const redisClient = redis.createClient({
    host:'redis-15552.c259.us-central1-2.gce.cloud.redislabs.com',
    port: 15552,
    password: 'K1L4yIHkTOQOZ79khSpU3aF7Y6B9WOoM'
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.use(bodyParser.urlencoded({extended: false}));
const proyectos = require('./routes/proyectos');
const casosdeuso = require('./routes/casosdeuso');
const login = require('./routes/login');
const tareas = require('./routes/tareas');
const rutaairtable = require('./routes/airtable');



//const mensaje = require ('./routes/mensaje');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'qwertyasdfzxcv', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    store: new RedisStore ({
        client: redisClient
       
    })
}));

app.use('/proyectos', proyectos);
app.use('/casosdeuso', casosdeuso);
app.use('/tareas', tareas);
app.use('/login',login);
app.use('/airtable',rutaairtable);

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




app.listen(8080);