const Level = require('../models/Level')

const registerLevel = async (data)=>{
    try {
        const level = new Level(data)
        const result = await level.save()
        if (result) {
            return {
                success: true,
                message: 'Level registered successfully',
                status: 201,
                data: result
            }
        } else {
            return {
                success: false,
                message: 'Failed to register level',
                status: 500
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Failed to register level',
            status: 500
        }
    }
}

const getAllLevels = async () => {
    try {
        const levels = await Level.find({})
        if (levels) {
            return {
                success: true,
                message: 'Levels fetched successfully',
                status: 200,
                data: levels
            }
        } else {
            return {
                success: false,
                message: 'Failed to fetch levels',
                status: 500
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Failed to fetch levels',
            status: 500
        }
    }
}

module.exports = {
    registerLevel,
    getAllLevels
}