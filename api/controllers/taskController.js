const Task = require('../Models/taskModel');

const createTask = async(req,res)=>{
    try{
        const userId = req.user.id;

        const { status, priority, assignees, dueDate, moreProperty, aboutTask } = req.body;
        if (!status || !priority || !assignees || !dueDate) {
            return res.status(400).json({
                error: 'All required fields must be provided',
            });
        }

        const newTask = new Task({
            status,
            priority,
            assignees,
            dueDate,
            moreProperty,
            aboutTask,
        })

        await newTask.save();

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask,
        });
        console.log(newTask);
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: 'Internal server error',
        });

    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; 
        const tasks = await Task.find(); 
        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks: tasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};

module.exports={
    createTask,
    getTasks
}