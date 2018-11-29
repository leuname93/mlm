const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const products = new Schema({
	title:{type: String},
	price:{type: Number},
	state_name:{type: String},
	sold_quantity:{type: Number},
	condition:{type: String},
	thumbnail:{type: String}
});

module.exports = mongoose.model('shoes', products);