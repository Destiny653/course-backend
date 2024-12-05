const levelService = require('../services/level.services')
const registerLevel = async (req, res)=>{
    const level = req.data 
    const data = await levelService.registerLevel(level)
    return res.status(data.status).json(data)
}

const getAllLevels = async (req, res)=>{
    const data = await levelService.getAllLevels()
    return res.status(data.status).json(data)
}

module.exports = {registerLevel, getAllLevels}