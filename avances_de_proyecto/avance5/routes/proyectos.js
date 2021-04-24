const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const proyectosController = require('../controllers/proyectos_controller');

const airtable_controller = require('../controllers/airtable_controller');

router.get('/inicio', isAuth, proyectosController.inicio);

router.get('/crear_proyecto', isAuth, proyectosController.crear_proyecto);

router.post('/crear_proyecto' , isAuth, proyectosController.postProyecto); 

router.get('/gestionarAirtable/:proyecto_id' , isAuth,  proyectosController.getgestionarairtable  );

router.get('/todos', isAuth, proyectosController.get);  

router.get('/casosdeuso/:proyecto_id' , isAuth,  proyectosController.getCaso  );

router.get('/iteraciones/:proyecto_id' , isAuth,  proyectosController.getIteraciones  );

router.post('/nuevaiteracion' , isAuth,  proyectosController.postIteracion  );

router.get('/nuevaiteracion/:proyecto_id' , isAuth,  proyectosController.crear_iteracion  );


router.get('/nuevocaso/:proyecto_id' , isAuth,  proyectosController.getNuevoCaso  );
//<button name="opt"><a href="/proyectos/airtable/<%=Proyecto.IdProyecto%>" class="btn">Enviar a Airtable</a> </button>


router.get('/detalles/:proyecto_id' , isAuth,  proyectosController.getDetalles  );

router.post('/eliminar-proyecto', isAuth, proyectosController.postEliminarProyecto);

router.get('/Wbs' , isAuth,  proyectosController.getWbs );

router.post('/Wbs' , isAuth,  proyectosController.postWbs );

router.get('/detalleset', isAuth, proyectosController.detalleset);

router.get('/actividades', isAuth, proyectosController.actividades);

router.get('/:proyecto_id',  isAuth, proyectosController.getProyecto);

router.post('/:proyecto_id', isAuth, proyectosController.postActualizarProyecto);







//router.get('/nuevatarea/:proyecto_id' , isAuth,  proyectosController.getNuevaTarea  );

//router.post('/nuevatarea/:proyecto_id' , isAuth,  proyectosController.postNuevaTarea  );




/*Obtener la lista de proyectos*/




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