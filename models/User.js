const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define user schema that maps to mongodb collection.
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	photo: {
		type: String,
	},
	googleID: {
		type: String,
		required: true,
		unique: true,
	},
	devices: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Device',
		},
	],
});

// Convert the schema to a user model.
module.exports = mongoose.model('User', userSchema);
