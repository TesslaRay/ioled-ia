const router = require('express').Router();

const {chargeImage} = require('../controller/images');
const {noUser} = require('../controller/handlers');

router.route('/add')
    .all(noUser)
    .post(chargeImage);

module.exports = router;
