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
  console.log('[iOLED-API][getDeviceState][Request]', req.params, req.body);
  const devices = await Device.find({_user: req.user.id}, 'deviceId duty state alias timerOn timerOff timerState');
  console.log('[iOLED-API][getDeviceState][Response] ', devices);
  res.send({devices});
};

/**
 * Register a new device for the current user.
 * @description Add a new device to the user database.
 * @param {{body: {deviceId: string}, user: {id: string}}} req Request.
 * @param {object} res Response.
 */
exports.newDevice = async (req, res) => {
  console.log('[iOLED-API][newDevice][Request]', req.params, req.body);
  const {deviceId} = req.body;
  const currentUser = await User.findById(req.user.id);
  try {
    const device = await new Device({
      deviceId,
      _user: req.user.id,
    }).save();
    currentUser.devices.push(device);
    console.log('[iOLED-API][newDevice][Response]', {
      message: 'Registered devices',
    });
    res.status(201).send({message: 'Registered device'});
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(400).send({error: error.message});
    }
    if (error.name === 'MongoError') {
      return res.status(409).send({error: error.errmsg});
    }
    console.log('[iOLED-API][newDevice][Error]', {error: error.message});
  }
};

/**
 * Update the configuration of a registered device for the current user.
 * @description Send the configuration to Google IoT Core.
 * @param {{params: {id: string},
 * body: {device: {deviceId: string, config: {duty: number, state: boolean, timerOn: string, timeOff: string, timerState: boolean, }}},
 * user: {id: string}}} req Request.
 * @param res Response.
 */
exports.updateDeviceConfig = async (req, res) => {
  console.log('[iOLED-API][updateDeviceConfig][Request] ', req.params, req.body);

  // Get the deviceId and config from the request body.
  let config;
  const deviceId = req.params.id;
  try {
    ({config} = req.body.device);
  } catch (error) {
    console.log('[iOLED-API][updateDeviceConfig][Error] ', {error: error.message});

    return res.status(400).send({status: 400});
  }
  // Send the configuration to google IoT core.
  const status = await sendGoogleDeviceConfig(deviceId, config);
  // If configuration is ok, then update the config in the database.
  if (status === 200) {
    try {
      await Device.findOneAndUpdate(
        {_user: req.user.id, deviceId: deviceId},
        {
          duty: config.duty,
          state: config.state,
          timerOn: config.timerOn,
          timerOff: config.timerOff,
          timerState: config.timerState,
        },
      );
      console.log('[iOLED-API][updateDeviceConfig][Response] ', {
        message: 'Config updated',
      });

      return res.status(status).send({status});
    } catch (error) {
      console.log('[iOLED-API][updateDeviceConfig][Error] ', {error: error.message});
      console.log('MongoError', error);
    }
  }
  if (status === 404) {
    console.log('[iOLED-API][updateDeviceConfig][Error] ', {error: 404});
    return res.status(404).send({status});
  }
  if (status === 429) {
    // Send error 429: too many request.
    console.log('[iOLED-API][updateDeviceConfig][Error] ', {error: 409});
    return res.status(429).send({status});
  }
};

/**
 * Delete a device from the database.
 * @param {{params: {id: string}, user: {id: string}}} req Request.
 * @param {object} res Respose.
 */
exports.deleteDevice = async (req, res) => {
  console.log('[iOLED-API][deleteDevice][Request]', req.params, req.body);

  // Get the deviceid from the body.
  const deviceId = req.params.id;
  try {
    const dev = await Device.findOneAndDelete({
      _user: req.user.id,
      deviceId: deviceId,
    });
    if (dev) {
      console.log('[iOLED-API][deleteDevice][Response]', {
        message: 'Delete device',
      });
      res.status(200).send({status: 200});
    }
  } catch (error) {
    console.log('[iOLED-API][deleteDevice][Error]', {error: error.message});
  }
};

/**
 * Get the device state
 * @param {{params: {id: string}, user: {id: string}}} req Request.
 * @param {object} res Respose.
 */
exports.getDeviceState = async (req, res) => {
  console.log('[iOLED-API][getDeviceState][Request]', req.params, req.body);
  try {
    // Get device state
    const deviceId = req.params.id;
    const deviceState = await getGoogleDeviceState(deviceId);
    console.log('[iOLED-API][getDeviceState][Response] ', deviceState);
    res.status(200).json({deviceState});
  } catch (error) {
    console.log('[iOLED-API][getDeviceState (' + deviceId + ')][Error] ', error);
    // Send the error
    res.status(500).json({error});
  }
};

/**
 * changeAlias
 * @param {{params: {id: string}, user: {id: string}}} req Request.
 * @param {object} res Respose.
 */
exports.changeAlias = async (req, res) => {
  const deviceId = req.params.id;

  try {
    ({config} = req.body.device);
  } catch (err) {
    return res.status(400).send({status: 400});
  }
  console.log('Change alias ...');

  try {
    await Device.findOneAndUpdate(
      {_user: req.user.id, deviceId: deviceId},
      {
        alias: config.alias,
      },
    );
    return res.status(204).send({status: 204});
  } catch (err) {
    console.log('MongoError', err);
  }
};
