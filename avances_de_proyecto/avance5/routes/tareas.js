const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const tareaController = require('../controllers/tarea_controller');


router.get('/nueva/:casodeuso_id/:proyecto_id', isAuth, tareaController.getNuevaTarea);

router.post('/nueva', isAuth, tareaController.postNuevaTarea);

//router.get('/todos', isAuth, casosdeusoController.get);

router.get('/actualizarTarea/:tarea_id', isAuth, tareaController.getActualizarTarea);

router.post('/actualizarTarea/', isAuth, tareaController.postActualizarTarea);


module.exports = router;