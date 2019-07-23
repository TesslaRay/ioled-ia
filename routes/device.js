const router = require('express').Router();

const {listDevices, newDevice, updateDeviceConfig, deleteDevice, getDeviceState} = require('../controller/device');
const {noUser, deviceConfigLimit, deviceStateLimit} = require('../controller/handlers');

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
	.put(updateDeviceConfig);

module.exports = router;
