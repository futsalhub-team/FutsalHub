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

router.post('/add-member',
  validate([
    body('teamId').isNumeric(),
    body('userId').isNumeric()
  ]),
  teamController.addMember
);

router.get('/get-teams', teamController.getTeamList);

router.post('/get-team-detail',
  validate([
    body('teamId').isNumeric()
  ]),
  teamController.getTeamDetail
)

router.post('/create-recruitment',
  validate([
    body('userId').isNumeric(),
    body('title').isString(),
    body('content').isString()
  ]),
  teamController.createRecruitment
)

router.get('/get-recruitments', teamController.getRecruitmentList);

module.exports = router;