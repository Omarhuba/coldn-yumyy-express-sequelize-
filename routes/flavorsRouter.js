const { Router } = require('express')

const flavorsController = require('../controllers/flavorsController')

const router = new Router()

router.get('/flavors', flavorsController.getFlavors)
router.post('/flavors', flavorsController.postFlavors)

module.exports = router