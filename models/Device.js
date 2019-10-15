const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema that describes the user.
const deviceSchema = new Schema({
	deviceId: {
		type: String,
		required: true,
		unique: true,
	},
	alias: {
		type: String,
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	duty: {
		type: Number,
		default: 0,
	},
	state: {
		type: Boolean,
		default: true,
	},
	timerOn : {
		type: String,
		default: '00:00',
	},
	timerOff: {
		type: String,
		default: '00:00',
	},
	timerState: {
		type: Boolean,
		default: false,
	},
});

// Copy the deviceId to the alias field.
deviceSchema.pre('save', function(next) {
	this.alias = this.get('deviceId');
	next();
});

// Tell mongoose to create a new collection with 'users' name.
module.exports = mongoose.model('Device', deviceSchema);
