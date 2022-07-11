const {Router} =require('express');
const pool =require('../db');

const {getAllTasks,getTask,createTask,deleteTask,updateTask} =require('../controllers/tasks.controller');

const router = Router();

router.post("/tasks", createTask);

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);



module.exports = router;