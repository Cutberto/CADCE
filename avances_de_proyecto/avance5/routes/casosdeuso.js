const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const casosdeusoController = require('../controllers/casosdeuso_controller');


router.get('/NuevoCasoDeUso', isAuth, casosdeusoController.getNuevoCasoDeUso);

router.post('/NuevoCasoDeUso', isAuth, casosdeusoController.postNuevoCasoDeUso);

router.get('/todos', isAuth, casosdeusoController.get);

router.post('/eliminar-casoDeUso', isAuth, casosdeusoController.postEliminarCasoDeUso);

router.post('/actualizarCaso', isAuth, casosdeusoController.postActualizarCasoDeUso);

router.get('/actualizarCaso', isAuth, casosdeusoController.getActualizarCasoDeUso);

router.get('/:casodeuso_id/:proyecto_id' , isAuth,  casosdeusoController.getTareas);

router.get('/:casodeuso_id',  isAuth, casosdeusoController.getActualizarCasoDeUso);  

router.post('/:casodeuso_id', isAuth, casosdeusoController.postActualizarCasoDeUso);


module.exports = router;