const PersonalTask = require('../Models/personalTaskModel'); 
const OrganizationalTask = require('../Models/organizationalTaskModel');

const createTask = async (req, res) => {
    try {
        const userId = req.user.id;

        const { status, priority, assignees, dueDate, moreProperty, aboutTask, spaceType } = req.body;
        if (!status || !priority || !assignees || !dueDate || !spaceType) {
            return res.status(400).json({
                error: 'All required fields must be provided',
            });
        }

        let newTask;
        if (spaceType === "Personal") {
            newTask = new PersonalTask({
                status,
                priority,
                assignees,
                dueDate,
                moreProperty,
                aboutTask,
            });
        } else if (spaceType === "Organizational") {
            newTask = new OrganizationalTask({
                status,
                priority,
                assignees,
                dueDate,
                moreProperty,
                aboutTask,
            });
        } else {
            return res.status(400).json({
                error: 'Invalid spaceType',
            });
        }

        await newTask.save();

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};

module.exports = {
    createTask,
};
