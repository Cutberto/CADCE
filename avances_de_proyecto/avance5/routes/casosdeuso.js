const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const casosdeusoController = require('../controllers/casosdeuso_controller');


router.get('/NuevoCasoDeUso', isAuth, casosdeusoController.getNuevoCasoDeUso);

router.post('/NuevoCasoDeUso', isAuth, casosdeusoController.postNuevoCasoDeUso);

router.get('/todos', isAuth, casosdeusoController.get);


module.exports = router;