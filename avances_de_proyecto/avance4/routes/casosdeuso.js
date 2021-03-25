const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const casosdeusoController = require('../controllers/casosdeuso_controller');



router.get('/NuevoCasoDeUso',  casosdeusoController.getNuevoCasoDeUso);

router.post('/NuevoCasoDeUso',  casosdeusoController.postNuevoCasoDeUso);






module.exports = router;