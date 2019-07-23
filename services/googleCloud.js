const {google} = require('googleapis');
const googleConf = require('../config/google.js');

/**
 * Get the client from google cloud.
 * @description GOOGLE_APPLICATION_CREDENTIALS environment variable must be set to the service account path.
 * @returns {Promise<object>} Returns the client associated to the google account.
 */
exports.getClient = async () => {
	// Get the google client.
	const authClient = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/cloud-platform'],
	});
	// Set the client to auth variable.
	google.options({
		auth: authClient,
	});
	// Api discovery URI
	const discoveryUrl = `${googleConf.api.discovery}?version=${googleConf.api.version}`;
	// Get google api client.
	try {
		const client = await google.discoverAPI(discoveryUrl);
		return client;
	} catch (err) {
		console.log('Error during API discovery', err);
	}
};

/**
 * @description Return the list of devices registered in google cloud iot.
 * @param {Object} client - The google cloud client.
 * @returns {Promise<Object[]>} Returns the list of devices.
 */
exports.getIotCoreDevices = async client => {
	const request = {parent: googleConf.iotCore.registryName};
	try {
		const {
			data: {devices},
		} = await client.projects.locations.registries.devices.list(request);
		return devices;
	} catch (err) {
		console.log('Could not list devices');
		console.log(err);
	}
};

/**
 * Send the configuration to a iot core device.
 * @param {Object} client The google cloud client.
 * @param {String} deviceId The id or name of the devices registered.
 * @param {string} config The configuration blob send to the device.
 * @example
 * // Configuration example
 * { board: { led1: { duty: 1, state: false } } };
 * @returns {Promise<number>} HTTP status code - 200, 429.
 */
exports.sendIotCoreDeviceConfig = async (client, deviceId, config) => {
	// Convert data to base64.
	const binaryData = Buffer.from(config).toString('base64');
	// Create request object.
	const request = {
		name: `${googleConf.iotCore.registryName}/devices/${deviceId}`,
		versionToUpdate: googleConf.iotCore.version,
		binaryData: binaryData,
	};
	try {
		// Send the request to iot core.
		const data = await client.projects.locations.registries.devices.modifyCloudToDeviceConfig(request);
		// Return 200 on success update.
		return data.status;
	} catch (err) {
		// return error 429.
		console.log('Response:', err);
		return err.response.status;
	}
};

/**
 * Get the state of a iot core device.
 * @param {Object} client The google cloud client.
 * @param {String} deviceId The id or name of the devices registered.
 * @returns {Promise<{deviceStates: Array<{binaryData: string}>}>} HTTP status code - 200, 429.
 */
exports.getIoTCoreDeviceState = async (client, deviceId) => {
	const request = {
		name: `${googleConf.iotCore.registryName}/devices/${deviceId}`,
	};
	try {
		const response = await client.projects.locations.registries.devices.states.list(request);
		return response.data;
	} catch (err) {
		console.log(err);
		return err.response.status;
	}
};
