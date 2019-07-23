const router = require('express').Router();

const {fetchIotCoreDevices} = require('../controller/google');

router.route('/google/devices').get(fetchIotCoreDevices);

module.exports = router;
