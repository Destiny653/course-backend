const userService = require('../services/user.services')

const register = async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body
    if (!firstName) {
        return res.status(400).json({ success: false, message: 'First name is required' })
    }
    if (!lastName) {
        return res.status(400).json({ success: false, message: 'Last name is required' })
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
    }
    if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' })
    }
    if (!role) {
        return res.status(400).json({ success: false, message: 'Role is required' })
    }
    const hashPassword = await userService.hashPassword(password)
    req.data = {
        firstName,
        lastName,
        email,
        password: hashPassword,
        role
    }

    next()
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
    }

    if (!email) {
        return res.status(400).json({ success: false, message: 'Password is required' })
    }

    const user = await userService.findUser('email', email)
    if (!user.success) {
        user.email = email
        return res.status(404).json(user)
    }
    req.user = user

    next();
}

const student = async (req, res, next) => {
    const { enrollementDate, dateOfBirth, user, level } = req.body
    if (!enrollementDate) {
        return res.status(400).json({ success: false, message: 'Enrollement date is required' })
    }
    if (!dateOfBirth) {
        return res.status(400).json({ success: false, message: 'Date of birth is required' })
    }
    if (!user) {
        return res.status(400).json({ success: false, message: 'User ID is required' })
    }
    if (!level) {
        return res.status(400).json({ success: false, message: 'Level is required' })
    }
    req.data = {
        enrollementDate,
        dateOfBirth,
        user,
        level
    };
    next();
}
const teacher = async (req, res, next) => {
    const { qualification, experience, user, level } = req.body
    if (!qualification) {
        return res.status(400).json({ success: false, message: 'Qualification is required' })
    }
    if (!experience) {
        return res.status(400).json({ success: false, message: 'Experience is required' })
    }
    if (!user) {
        return res.status(400).json({ success: false, message: 'User ID is required' })
    }
    if (!level) {
        return res.status(400).json({ success: false, message: 'Level is required' })
    }
    req.data = {
        qualification,
        experience,
        user,
        level
    };
    next();
}

const validateToken = async (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized. Please login first.'
        });
    }
    const token = userService.tokenVerify(auth);

    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized. Please login first.'
        });
    }
    const user = await userService.findUser('_id', token.id);
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized. Please login first.'
        });
    }
    req.auth = user;
    next();
}

module.exports = {
    register,
    login,
    student,
    teacher,
    validateToken,
}
