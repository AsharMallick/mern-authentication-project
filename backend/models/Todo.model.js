const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

exports.Todo = mongoose.model('Todo', schema);