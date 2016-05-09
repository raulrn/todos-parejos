var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.userCountSchema = new Schema({
	email: {type: String, default: ''},
	name: {type: String, default: ''},
	foodDish: {type: String, default: ''},
	cost: {type: Number, default: 0}
});