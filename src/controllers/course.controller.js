const courseService = require('../services/course.services');

const registerCourse = async (req, res) => {
    const info = req.data
    const data = await courseService.createCourse(info)
    return res.status(data.status).json(data)
}

const getAllCourses = async (req, res) => {
    const data = await courseService.getCourse()
    return res.status(data.status).json(data)
}

const getCourseById = async (req, res) => {
    const id = req.params.id
    const data = await courseService.getCourseById(id)
    return res.status(data.status).json(data)
}

const updateCourseId = async (req, res) => {
    const id = req.params.id
    const info = req.data
    const data = await courseService.updateCourse(id, info)
    return res.status(data.status).json(data)
}

const deleteCourseById = async (req, res) => {
    const id = req.params.id
    const data = await courseService.deleteCourse(id)
    return res.status(data.status).json(data)
}

const enrolleCourseStudent = async (req, res) => {
    const courseId = req.params.courseId
    const studentId = req.params.studentId
    const data = await courseService.addCourseToStudent(courseId, studentId)
    return res.status(data.status).json(data)
}

module.exports = {
    registerCourse,
    getAllCourses,
    getCourseById,
    updateCourseId,
    deleteCourseById,
    enrolleCourseStudent,
}