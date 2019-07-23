const router = require('express').Router();

// Import all function for api controller.
const { currentUser, logoutUser } = require('../controller/user');

router.route('/user').get(currentUser);
router.route('/user/logout').get(logoutUser);

module.exports = router;
