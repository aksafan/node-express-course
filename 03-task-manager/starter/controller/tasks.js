const Task = require('./../models/task');
const asyncWrapper = require('./../middleware/async');
const {createCustomError} =  require('./../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({});
    res.status(201).json({tasks});
});

const getTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params;
    const task = await Task.findOne({_id: id});
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }

    res.status(200).json({task});
});

const createTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params;
    const body = req.body;
    const task = await Task.findOneAndUpdate(
        {_id: id},
        body,
        {
            new: true,
            runValidators: true
        }
    );
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }

    res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params;
    const task = await Task.findOneAndDelete({_id: id});
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }

    res.status(200).json({msg: 'Task was deleted'});
});

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
