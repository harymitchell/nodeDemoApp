var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: String,
  name: String,
  username:  String,
  email: String,
  fullname:   String,
  age: Number,
  location: String,
  gender: String,
  cart: [Schema.Types.ObjectId]
});

var userModel = mongoose.model('users', userSchema);
exports.userModel = userModel;
