const express = require('express');

const router = express.Router();

const path = require('path');

const isAuth = require('../utils/is-auth.js');
const isAdmin = require('../utils/is-admin.js');

const loginController = require('../controllers/login_controller');


router.get('/',  loginController.get);

router.post('/',  loginController.post);

router.get('/register',isAuth, isAdmin, loginController.getRegister);

router.post('/register', isAuth, isAdmin, loginController.postRegister);

module.exports = router;