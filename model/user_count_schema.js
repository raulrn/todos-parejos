var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.globalCountSchema = new Schema({
  email: {type: String, default: ''},
  user: {type: String, default: ''},
  amount: {type: String, default: ''},
});