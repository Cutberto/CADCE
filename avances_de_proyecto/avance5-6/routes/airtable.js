const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');

const proyectosController = require('../controllers/proyectos_controller');

const airtable_controller = require('../controllers/airtable_controller');

router.get('/:proyecto_id', isAuth, airtable_controller.sendToAirtableFunc  );

router.post('/:proyecto_id', isAuth, airtable_controller.sendToAirtableFunc  );

router.get('/updatesql/:proyecto_id', isAuth, airtable_controller.actualizarSQLconAirtable  );

router.post('/updatesql/:proyecto_id', isAuth, airtable_controller.actualizarSQLconAirtable  );



module.exports = router;