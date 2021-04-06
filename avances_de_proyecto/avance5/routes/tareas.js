const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const tareaController = require('../controllers/tarea_controller');


router.get('/nueva', isAuth, tareaController.getNuevaTarea);

router.post('/nueva', isAuth, tareaController.postNuevaTarea);

//router.get('/todos', isAuth, casosdeusoController.get);

//router.post('/actualizarCaso', isAuth, casosdeusoController.postActualizarCasoDeUso);

//router.get('/actualizarCaso', isAuth, casosdeusoController.getActualizarCasoDeUso);

module.exports = router;