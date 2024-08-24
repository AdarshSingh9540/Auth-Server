const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true,
        enum:["Not Started","In progress","Done"]
    },
    priority:{
        type:String,
        required:true,
        enum:["High","Medium","Low"]
    },
    assignees:{
      type : [String],
      required:true,
    },
    dueDate:{
        type:Number,
        required:true,    
    },
    moreProperty:{
      Type:String,
    
    },
    aboutTask:String,
    spaceType: {  
      type: String,
      required: true,
      enum: ["Personal", "Organizational"]
  }
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;