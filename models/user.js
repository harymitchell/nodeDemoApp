var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username:  String,
  email: String,
  fullname:   String,
  age: Number,
  location: String,
  gender: String,
  cart: []
});

var userModel = mongoose.model('users', userSchema);
exports.userModel = userModel;
