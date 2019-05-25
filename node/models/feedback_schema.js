//เริ่มจาก import mongoose
const mongoose = require('mongoose');
const feedbackSchema = mongoose.Schema({
    username:String,
    message:String,
    created:{type:Date,default:Date.now}

})

module.exports = mongoose.model("feedback",feedbackSchema);