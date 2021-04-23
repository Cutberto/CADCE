const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const tareaController = require('../controllers/tarea_controller');
const { isatty } = require('tty');


router.get('/nueva/:casodeuso_id/:proyecto_id', isAuth, tareaController.getNuevaTarea);

router.post('/nueva', isAuth, tareaController.postNuevaTarea);

//router.get('/todos', isAuth, casosdeusoController.get);

router.get('/actualizarTarea/:tarea_id', isAuth, tareaController.getActualizarTarea);

router.post('/actualizarTarea/', isAuth, tareaController.postActualizarTarea);

router.post('/EliminarTarea', isAuth, tareaController.postEliminarTarea);

router.post('/grafica', isAuth, tareaController.getDataTiempo);

module.exports = router;