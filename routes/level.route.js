const {Router} = require('express')
const router = Router()

const levelMiddleware = require('../src/middlewares/level.middleware')
const levelController = require('../src/controllers/level.controller')

   router.post('/post', levelMiddleware.register, levelController.registerLevel);
   router.get('/', levelController.getAllLevels)

module.exports = router