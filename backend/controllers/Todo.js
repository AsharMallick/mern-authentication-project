const { catchAsyncError } = require("../middlewares/catchasyncerror");
const {Todo} = require('../models/Todo.model');
const ErrorHandler = require("../utils/errorhandler");


exports.getTodos = catchAsyncError(async (req, res, next)=> {
    const todos = await Todo.find({user:req.user._id});

    res.status(200).json({
        success:true,
        todos
    })
})

exports.newTodo = catchAsyncError(async (req, res, next) => {
    const {title, description} = req.body;
    let todo = await Todo.create({title, description, user:req.user._id});
    res.status(201).json({
        success:true,
        message:"Todo created successfully",
        todo
    })
})

exports.deleteTodo = catchAsyncError(async(req, res, next)=>{
    const todo = await Todo.findById(req.params.id);
    if(!todo) {
        return next(new ErrorHandler("No Todo found", 404));
    }
    if(todo.user.toString()!= req.user._id.toString()){
        return next(new ErrorHandler("You can delete only your todos", 500));
    }
    await todo.deleteOne();
    res.status(200).json({
        success:true,
        message:"Todo deleted successfully"
    });
})

exports.updateTodo = catchAsyncError(async(req, res, next)=>{
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return next(new ErrorHandler("No Todo found", 404));
    }
    if (todo.user.toString() != req.user._id.toString()) {
      return next(new ErrorHandler("You can delete only your todos", 500));
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo
    });
})