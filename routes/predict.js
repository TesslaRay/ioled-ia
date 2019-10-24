const router = require('express').Router();

const {predictWithImage} = require('../controller/predict');
const {noUser} = require('../controller/handlers');

router.route('/predict')
    .all(noUser)
    .post(predictWithImage);

module.exports = router;
