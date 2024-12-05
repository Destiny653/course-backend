const User = require('../../src/models/User');
const Teacher = require('../../src/models/Teacher');
const Student = require('../../src/models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { trusted } = require('mongoose');


async function tokenVerify(token) {
    try {
        return jwt.verify(token, 'secret_key');
    } catch (error) {
        throw new Error('Invalid token: ' + error.message)
    }
}

async function comparePasswords(value, hash) {
    try {
        const compare = await bcrypt.compare(value, hash);
        if (compare) {
            return {
                success: true,
                status: 200,
                message: 'Credentials validated passwords match',
            }
        } else {
            return {
                success: false,
                status: 401,
                message: 'Passwords do not match',
            }
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'An error occured: ' + error,
        }
    }
}

const findUser = async (key, value) => {
    try {
        const data = await User.findOne({ [key]: value });
        if (data) {
            return {
                success: true,
                status: 200,
                message: 'User found',
                data
            }
        } else {
            return {
                success: false,
                status: 404,
                message: 'User not found with email: ' + value,
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            status: 500,
            message: 'An error occured: ' + error,
        }
    }
}

async function hashPassword(password) {
    try {

        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error('Invalid password: ' + error.message)
    }
}

const registerUser = async (info) => {
    try {
        const user = new User(info);
        const data = await user.save()
        if (data) {
            return {
                success: true,
                status: 201,
                message: 'User registered successfully',
                data
            }
        } else {
            return {
                success: false,
                status: 401,
                message: 'Failed to register user',
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            status: 401,
            message: 'An error occured: ' + error,
        }
    }
}


const registerTeacher = async (info) => {
    try {
        const teacher = new Teacher(info);
        const data = await teacher.save()
        if (data) {
            return {
                success: true,
                status: 201,
                message: 'Teacher registered successfully',
                data: data
            }
        } else {
            return {

                success: false,
                status: 401,
                message: 'Failed to register teacher',
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            status: 401,
            message: 'An error occured: ' + error,
        }
    }
}

const registerStudent = async (info) => {
    try {
        const student = new Student(info);
        const data = await student.save()
        if (data) {
            return {
                success: true,
                status: 201,
                message: 'Student registered successfully',
                data
            }
        } else {
            return {

                success: false,
                status: 401,
                message: 'Failed to register student',
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            status: 401,
            message: 'An error occured: ' + error,
        }
    }
}
 
const userLogin = async (data, password) => { 
    const compare = await comparePasswords(password, data.password)
    if (compare.success) {
        const token = jwt.sign({ id: data._id },'secret_key', { expiresIn: '1h' });
        return {
            success: trusted,
            status: 200,
            message: compare.message,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            token,
        }
    }else{
        return {
            success: false,
            status: 401, 
            message: compare.message
        }
    }
}

    module.exports = {
        registerUser,
        registerTeacher,
        registerStudent,
        userLogin,
        findUser,
        tokenVerify,
        hashPassword,
    };
