const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const proyectosController = require('../controllers/proyectos_controller');

router.get('/inicio', isAuth, proyectosController.inicio);

router.get('/crear_proyecto', isAuth, proyectosController.crear_proyecto);

router.post('/crear_proyecto' , isAuth, proyectosController.postProyecto);               

router.get('/todos', isAuth, proyectosController.todos);

router.get('/modif_proyecto', isAuth, proyectosController.modif_proyecto);

router.get('/detalleset', isAuth, proyectosController.detalleset);

router.get('/actividades', isAuth, proyectosController.actividades);


/*
router.get('/inicio', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'index.html'));
});

router.get('/crear_proyecto', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'crear_proyecto.html'));
});

router.get('/todos', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'todos_proyectos.html'));
});

router.get('/modif_proyecto', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'modif_proyecto.html'));
});

router.get('/detalleset', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'detalleset.html'));
});

router.get('/todos', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'todos_proyectos.html'));
});

router.get('/actividades', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'actividades.html'));
});
*/
module.exports = router;