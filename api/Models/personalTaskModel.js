const mongoose = require('mongoose');

const personalTaskSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ["Not Started", "In progress", "Done"]
    },
    priority: {
        type: String,
        required: true,
        enum: ["High", "Medium", "Low"]
    },
    assignees: {
        type: [String],
        required: true,
    },
    dueDate: {
        type: Number,
        required: true,
    },
    moreProperty: {
        type: String,
    },
    aboutTask: String,
});

const PersonalTask = mongoose.model('PersonalTask', personalTaskSchema);

module.exports = PersonalTask;
