const router = require('express').Router();

const {listDevices, newDevice, updateDeviceConfig, deleteDevice, getDeviceState, changeAlias} = require('../controller/device');
const {noUser, deviceStateLimit} = require('../controller/handlers');

router
	.route('/devices')
	.all(noUser)
	.get(listDevices)
	.post(newDevice);

router
	.route('/devices/:id')
	.all(noUser)
	.get(deviceStateLimit, getDeviceState)
	.delete(deleteDevice)
	.put(updateDeviceConfig)
	.post(changeAlias);

module.exports = router;
