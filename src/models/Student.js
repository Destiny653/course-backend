const {Schema, model} = require('mongoose');

const studentSchema = new Schema({ 
    enrollementDate: {
        type: String,
        required: true
    },
    dateOfBirth: {
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
 

module.exports = model('Student', studentSchema);