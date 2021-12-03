const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/error');


const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks =  await Task.find({});
    res.status(200).json({tasks});
});

const getOneTask = asyncWrapper( async ({params: {id}}, res, next) => {
    const task = await Task.findOne({_id: id});
    if(!task){
        return next(createCustomError(`Task with id: ${id} was not found`, 404));
    }
    res.status(200).json({task});

})

const createTask = asyncWrapper( async ({body}, res) => {
    const task = await Task.create(body)
    res.status(201).json({task});
});

const updateTask = asyncWrapper (async (req, res, next) => {
    const {id} = req.params;
    const task = await Task.findOneAndUpdate({_id:id}, req.body, {new: true, runValidaors: true});
    if(!task){
         return next(createCustomError(`Task with id ${id} does not exist`, 404));
    }
    res.status(200).json({task});
});

const deleteTask = asyncWrapper (async ({params:{id}}, res, next) => {
    const task = await Task.findOneAndDelete({_id: id});
    if(!task){
        return next(createCustomError(`Task with id ${id} doesn't exist, therefore it can't be deleted`));
    }
    const tasks = await Task.find({});
    res.status(200).json({tasks}); 
})

module.exports = {
    getAllTasks,
    getOneTask,
    createTask,
    updateTask,
    deleteTask
}