const course = (req, res, next)=>{
    const {title, description, level} = req.body
    if(!title ||!description ||!level){
        return res.status(400).json({message: 'All fields are required.'})
    }
    req.data = {
        title,
        description,
        level
    }
    next()
}

const update = (req, res, next)=>{
    const {id} = req.params
    const {title, description, level} = req.body
    const updatedCourse = {
        level,
        title,
        description, 
    }
    req.data = updatedCourse
    next()
}

module.exports = {
    course,
    update, 
}