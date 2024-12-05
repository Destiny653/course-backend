
const register = (req, res, next)=>{
    const {level , department, title} = req.body;
    if(!level ||!department){
        return res.status(400).json({message: 'All fields are required.'})
    }
    req.data = {
        level,
        department
    }
    next()
}

module.exports = {register}