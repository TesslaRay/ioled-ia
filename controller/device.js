const Device = require('../models/Device');
const User = require('../models/User');
const {sendGoogleDeviceConfig, getGoogleDeviceState} = require('./google');

/**
 * List all the registered devices for the current user.
 * @description List the devices registered in the user database.
 * @param {{user: {id: string}}} req Request.
 * @param {object} res Response.
 */
exports.listDevices = async (req, res) => {
	const devices = await Device.find({_user: req.user.id}, 'deviceId duty state alias -_id');
	res.send({devices});
};

/**
 * Register a new device for the current user.
 * @description Add a new device to the user database.
 * @param {{body: {deviceId: string}, user: {id: string}}} req Request.
 * @param {object} res Response.
 */
exports.newDevice = async (req, res) => {
	console.log(req.body);
	const {deviceId} = req.body;
	const currentUser = await User.findById(req.user.id);

	try {
		const device = await new Device({
			deviceId,
			_user: req.user.id,
		}).save();
		currentUser.devices.push(device);
		res.status(201).send({message: 'Dispositivo registrado'});
	} catch (err) {
		console.log(err);
		if (err.name === 'ValidationError') {
			return res.status(400).send({error: err.message});
		}
		if (err.name === 'MongoError') {
			return res.status(409).send({error: err.errmsg});
		}
	}
};

/**
 * Update the configuration of a registered device for the current user.
 * @description Send the configuration to Google IoT Core.
 * @param {{params: {id: string},
 * body: {device: {deviceId: string, config: {duty: number, state: boolean}}},
 * user: {id: string}}} req Request.
 * @param res Response.
 */
exports.updateDeviceConfig = async (req, res) => {
	// Get the deviceid and config from the request body.
	let config;
	const deviceId = req.params.id;
	try {
		({config} = req.body.device);
	} catch (err) {
		return res.status(400).send({status: 400});
	}
	console.log('Sending config ...');
	// Send the configuration to google iot core.
	const status = await sendGoogleDeviceConfig(deviceId, config);
	console.log('Response:', status);
	// If configuration is ok, then update the config in the database.
	if (status === 200) {
		try {
			await Device.findOneAndUpdate({_user: req.user.id, deviceId: deviceId}, {duty: config.duty, state: config.state});
			return res.status(status).send({status});
		} catch (err) {
			console.log('MongoError', err);
		}
	}
	if (status === 404) {
		return res.status(404).send({status});
	}
	if (status === 429) {
		// Send error 429: too many request.
		return res.status(429).send({status});
	}
};

/**
 * Delete a device from the database.
 * @param {{params: {id: string}, user: {id: string}}} req Request.
 * @param {object} res Respose.
 */
exports.deleteDevice = async (req, res) => {
	// Get the deviceid from the body.
	const deviceId = req.params.id;
	try {
		const dev = await Device.findOneAndDelete({_user: req.user.id, deviceId: deviceId});
		if (dev) {
			return res.status(200).send({status: 200});
		}
		return res.status(204).send({status: 204});
	} catch (err) {
		console.log(err);
	}
};

/**
 * Get the device state
 * @param {{params: {id: string}, user: {id: string}}} req Request.
 * @param {object} res Respose.
 */
exports.getDeviceState = async (req, res) => {
	const deviceId = req.params.id;
	const state = await getGoogleDeviceState(deviceId);
	res.send({state});
};
