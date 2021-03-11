const express = require('express');

const router = express.Router();

const path = require('path');


const loginController = require('../controllers/login_controller');


router.get('/',  loginController.get);

router.post('/',  loginController.post);

router.get('/register', loginController.getRegister);

router.post('/register', loginController.postRegister);

module.exports = router;