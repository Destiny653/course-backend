const {Schema, model} = require('mongoose');
const Student = require('./Student');

const levelSchema = new Schema({
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], 
        required: true, 
    },
    department: {
        type: String,
        enum: ['Digital-Marketing', 'Web-Developement', 'Cyber-Security', 'Graphic-Design'],
        required: true
    }, 
})

levelSchema.virtual(
    'student',
    {
        ref: 'Student',
        localField: '_id',
        foreignField: 'level'
    }
)

levelSchema.virtual(
    'teacher',
    {
        ref: 'Teacher',
        localField: '_id',
        foreignField: 'level'
    }
)

levelSchema.virtual(
    'course',
    {
        ref: 'Course',
        localField: '_id',
        foreignField: 'level'
    }
)

levelSchema.set('toObject', { virtuals: true });
levelSchema.set('toJSON', { virtuals: true });

module.exports = model('Level', levelSchema);