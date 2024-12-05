const {Schema, model} = require('mongoose');

const teacherSchema = new Schema({ 
    experience: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    level: {
        type: Schema.Types.ObjectId,
        ref: 'Level',
        required: true
    } 
},{timestamps:true})
 

module.exports = model('Teacher', teacherSchema);