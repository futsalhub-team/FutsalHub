const express = require('express')
const router = express.Router()
const userController = require('./controller.user/user')
const validate = require('../../middleware/validate')
const { body } = require('express-validator');

router.post('/read-user-detail',
    validate([
        body('id').isNumeric()
    ]),
    userController.readUserDetail
);

module.exports = router;