const Course = require('../../src/models/Course');
const Student = require('../../src/models/Student');

const createCourse = async (info) => {
    try {
        const course = new Course(info)
        const data = await course.save()
        if (data) {
            return {
                success: true,
                message: 'Course created successfully',
                status: 201,
                data:data
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to create course',
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}


const getCourse = async () => {
    try {
        const data = await Course.find()
        .populate({path: "level", 
            populate:[
                {path: "student", model:"Student"},
                {path: "teacher", model:"Teacher"}
            ]})
 
        if (data) {
            return {
                success: true,
                status: 200,
                data:data
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to fetch courses',
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}

const getCourseById = async (id) => {
    try {
        const data = await Course.findById(id)
        if (data) {
            return {
                success: true,
                status: 200,
                data:data
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to fetch course with ID: ' + id,
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}

const updateCourse = async (id, info) => {
    try {
        const data = await Course.findByIdAndUpdate(id, info, { new: true })
        if (data) {
            return {
                success: true,
                status: 200,
                message: 'Course updated successfully',
                data:data
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to update course with ID: ' + id,
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}

const deleteCourse = async (id) => {
    try {
        const data = await Course.findByIdAndDelete(id)
        if (data) {
            return {
                success: true,
                status: 200,
                message: 'Course deleted successfully',
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to delete course with ID: ' + id,
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}

const addCourseToStudent = async (courseId, studentId) =>{
    try {
        const student = await Student.findByIdAndUpdate(studentId, { $push: { courses: courseId } }, { new: true })
        if (student) {
            return {
                success: true,
                status: 200,
                message: 'Course added to student successfully',
                data: student
            }
        } else {
            return {
                success: false,
                status: 500,
                message: 'Failed to add course to student with ID: ' + studentId,
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error occured: ' + error,
        }
    }
}

module.exports = {
    createCourse,
    getCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    addCourseToStudent,
}