const express = require('express');

const router = express.Router();

const path = require('path');



router.get('/inicio', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'index.html'));
});

router.get('/crear_proyecto', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'crear_proyecto.html'));
});

router.get('/todos', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..' ,  'views', 'todos_proyectos.html'));
});





module.exports = router;