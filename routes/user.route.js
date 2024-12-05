const {Router} = require('express');

const router = Router();

const userMiddleware = require('../src/middlewares/user.middleware')
const userController = require('../src/controllers/user.controller')

router.post('/register', userMiddleware.register, userController.register);
router.post('/login', userMiddleware.login, userController.login);
router.post('/teacher',  userMiddleware.teacher, userController.registerTeacher);
router.post ('/student', userMiddleware.student, userController.registerStudent);
router.get('/', userController.getUsers)

module.exports = router