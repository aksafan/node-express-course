const Task = require('./../models/task');

const getAllTasks = (req, res) => {
    res.send('all tasks');
};

const getTask = (req, res) => {
    res.send('one task');
};

const createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
};

const updateTask = (req, res) => {
    res.send('update task');
};

const deleteTask = (req, res) => {
    res.send('delete task');
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
