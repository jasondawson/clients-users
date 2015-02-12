var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true, index: true},
	email: {type: String, required: true, uniqueness: true, lowercase: true},
	address: {type: String, uppercase: true},
	city: {type: String, uppercase: true},
	state: {type: String, uppercase: true},
	zip: String,
	kind: {type: String, enum: ['Billing', 'Shipping', 'Both'], default: 'Both'},
	age: {type: Number, required: true, min: 13}
});

module.exports = Mongoose.model('User', schema);