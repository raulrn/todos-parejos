var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.userSchema = new Schema({
  nick: {type: String, default: ''},
  user: {type: String, default: ''},
  password: {type: String, default: ''},
  isCard: {type: Boolean, default: false},
  card: {type: String, default: ''}
});