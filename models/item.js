var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  type:  String,
  price: Number,
  location:   String,
  ownerId: Schema.Types.ObjectId
});

var itemModel = mongoose.model('item', itemSchema);
exports.itemModel = itemModel;
