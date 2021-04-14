const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const tareaController = require('../controllers/tarea_controller');


router.get('/nueva/:casodeuso_id', isAuth, tareaController.getNuevaTarea);

router.post('/nueva', isAuth, tareaController.postNuevaTarea);

//router.get('/todos', isAuth, casosdeusoController.get);

router.post('/actualizarTarea', isAuth, tareaController.postActualizarTarea);

router.get('/actualizarTarea', isAuth, tareaController.getActualizarTarea);

module.exports = router;