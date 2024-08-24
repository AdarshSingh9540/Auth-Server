const express= require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createTask,getTasks} = require('../controllers/taskController');

router.post('/task',authMiddleware,createTask);
router.get('/task',authMiddleware,getTasks)
module.exports = router;