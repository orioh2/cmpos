const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  level: {type: String, default: "normal"},
  created: {type: Date, default: Date.now}
}); 

userSchema.index({ username: 1}, { unique: true });

module.exports = mongoose.model('users', userSchema)


