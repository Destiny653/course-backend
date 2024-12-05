const {Schema, model} = require('mongoose');

const courseSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    level: {
        type: Schema.Types.ObjectId,
        ref: 'Level',
        required: true
    }
},{timestamps:true}) 
 

module.exports = model('course', courseSchema);