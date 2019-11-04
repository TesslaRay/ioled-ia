/**
 * Google configuration with the parameters to connecto to the cloud.
 * @namespace config
 * @property {Object} api Google cloud api config.
 * @property {Object} iotCore Google IoT core config.
 * @property {Object} cloudStorage Google cloud storage core config.
 */
const config = {
	/** */
	api: {
		version: 'v1',
		discovery: 'https://cloudiot.googleapis.com/$discovery/rest',
	},
	iotCore: {
		cloudRegion: 'us-central1',
		projectId: 'ioled-dev-248517',
		registryId: 'ioled-devices',
		version: 0,
		parentName: '',
		registryName: '',
	},
	cloudStorage: {
		cloudBucket: 'gs://ioled-upload',
		publicBucket: 'ioled-upload',
	}
};

config.iotCore.parentName = `projects/${config.iotCore.projectId}/locations/${config.iotCore.cloudRegion}`;
config.iotCore.registryName = `${config.iotCore.parentName}/registries/${config.iotCore.registryId}`;

module.exports = config;
