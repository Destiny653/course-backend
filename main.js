require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose'); 


// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    const app = express()
    app.use(cors())
    app.use(express.json())

    const courseRouter = require('./routes/course.route')
    const userRouter = require('./routes/user.route')
    const levelRouter = require('./routes/level.route')

    app.use('/courses', courseRouter)
    app.use('/users', userRouter)
    app.use('/levels', levelRouter)


    app.listen(3000, ()=>{
        console.log('Server is running on port 3000')
    })
})
.catch(err => console.error('Could not connect to MongoDB:', err));