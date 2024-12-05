const express = require('express')
const router = express.Router()
const teamController = require('./controller.team/team')
const validate = require('../../middleware/validate')
const { body } = require('express-validator');

router.post('/create-team', 
    validate([
        body('name').isString(),
        body('leaderId').isNumeric()
      ]),

      teamController.createTeam
);

module.exports = router;