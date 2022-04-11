const { Router } = require('express')

const voteController = require('../controllers/voteController')

const router = new Router()

router.post('/vote', voteController.postVote)

module.exports = router
