const userService = require('../services/user.services');
const User = require('../models/User')

 
const login = async (req, res) => {
    const {password} = req.body 
    const data = req.user
    const _data ={
        _id: data?._id,
        firstName: data.data?.firstName,
        lastName: data.data?.lastName,
        email: data.data?.email,
        password: data.data?.password,
        role: data.data?.role, 
    }
    console.log("DATA",_data, password) 
    
    const login = await userService.userLogin(_data, password)
    res.json(login)
}

const register = async (req, res) => {
    const info = req.data
    const data = await userService.registerUser(info)
    res.status(data?.status).json(data)
}

const registerTeacher = async (req, res) => {
    const info = req.data
    const data = await userService.registerTeacher(info)
    res.status(200).json(data)
}

const registerStudent = async (req, res) => {
    const info = req.data
    const data = await userService.registerStudent(info)
    res.status(200).json(data)
}

const getUsers = async (req, res)=> {
    try { 
        const users = await User.find({})
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    login,
    registerTeacher,
    registerStudent,
    register,
    getUsers
}