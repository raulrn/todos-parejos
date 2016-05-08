var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.foodDishSchema = new Schema({
  name: {type: String, default: ''},
  cost: {type: Number, default: 0}
});