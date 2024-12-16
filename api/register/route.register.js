const express = require('express')
const router = express.Router()
const registerController = require('./controller.register/register')
const validate = require('../../middleware/validate')
const { body } = require('express-validator');

router.post('/register-user',

  validate([
    body('loginId').isString(),
    body('nickname').isString(),
    body('password').isString(),
    body('preferredPosition').isString()
  ]),

  registerController.register
);

module.exports = router;