const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTask, getTasks } = require('../controllers/taskController');


router.post('/task', authMiddleware, createTask);


router.get('/tasks/personal', authMiddleware, async (req, res) => {
    try {
        const tasks = await PersonalTask.find({}); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/tasks/organizational', authMiddleware, async (req, res) => {
    try {
        const tasks = await OrganizationalTask.find({}); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
