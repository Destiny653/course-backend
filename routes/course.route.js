const {Router} = require('express');

const router = Router();

const courseMiddleware = require('../src/middlewares/course.middleware')
const courseController = require('../src/controllers/course.controller')

router.post('/create', courseMiddleware.course, courseController.registerCourse)
router.get('/', courseController.getAllCourses)
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseMiddleware.update, courseController.updateCourseId);
router.delete ('/:id', courseController.deleteCourseById);
router.post ('/:id/enroll', courseController.enrolleCourseStudent);

module.exports = router