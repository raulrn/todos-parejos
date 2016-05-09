var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.globalCountSchema = new Schema({
  name: {type: String, default: ''},
  email: {type: String, default: ''},
  amount: {type: Number, default: 0},
  isLend: {type: Boolean, default: false},
  lender: {type: String, default: ''},
  isAgreeToPay: {type: Boolean, default: false},
  isCollect: {type: Boolean, default: false}
});