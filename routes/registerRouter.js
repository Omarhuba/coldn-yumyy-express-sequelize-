const { Router } = require('express')

const registerController = require('../controllers/registerController')

const router = new Router()

router.get('/register', registerController.getRegister)
router.post('/register', registerController.postRegister)

module.exports = router