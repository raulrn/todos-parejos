var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.userSchema = new Schema({
  nick: {type: String, default: ''},
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  isOnline: {type: Boolean, default: false},
  isCard: {type: Boolean, default: false},
  card: {type: String, default: ''}
});