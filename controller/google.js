const _ = require('lodash');
const {getClient, getIotCoreDevices, sendIotCoreDeviceConfig, getIoTCoreDeviceState} = require('../services/googleCloud');

/**
 * Get the list of the devices registered in iot core.
 * @param {object} req Request from the server
 * @param {object} res Response to the server.
 */
exports.fetchIotCoreDevices = async (req, res) => {
	const client = await getClient();
	const devices = await getIotCoreDevices(client);
	res.send({devices});
};

/**
 * Send the configuration to the device.
 * @description Transform the incoming configuration from the client, process it and send it to Google IoT Core.
 * @param {string} deviceId Device Id to update.
 * @param {{duty: number, state: boolean}} config Config structure.
 * @returns {Promise<number>} Return http status code.
 */
exports.sendGoogleDeviceConfig = async (deviceId, config) => {
	// Filter the input from the client.
	const _config = _.pick(config, ['duty', 'state']);
	// Generate the board format for the device.
	const board = {
		board: {
			led1: _config,
			led2: _config,
			led3: _config,
			led4: _config,
			led5: _config,
		},
	};
	// Convert config object to JSON.
	const data = JSON.stringify(board);
	// Get the client.
	const client = await getClient();
	// Send the device config and get the response (Ok or error message).
	const response = await sendIotCoreDeviceConfig(client, deviceId, data);
	// response is a http status code (200, 429).
	return response;
};

/**
 * Send the configuration to the device.
 * @description Transform the incoming configuration from the client, process it and send it to Google IoT Core.
 * @param {string} deviceId Device id.
 */
exports.getGoogleDeviceState = async deviceId => {
	const client = await getClient();
	const response = await getIoTCoreDeviceState(client, deviceId);
	const state = _.isEmpty(response) ? {} : JSON.parse(Buffer.from(response.deviceStates[0].binaryData, 'base64').toString());
	return state;
};
