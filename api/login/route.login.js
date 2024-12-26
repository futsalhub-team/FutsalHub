const express = require('express')
const router = express.Router()
const validate = require('../../middleware/validate')
const { body } = require('express-validator');

const loginController = require('./controller.login/login')

router.post('/login',
    validate([
        body('loginId').isString(),
        body('password').isString()
    ]),
    loginController.login
);

router.post('/logout', loginController.logout);
