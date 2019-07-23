const rateLimit = require('express-rate-limit');

/**
 * Express middleware for non-authenticated paths.
 * @param req Request
 * @param res Response
 * @param next Callback function
 */
exports.noUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({error: 'You must log in'});
	}
	next();
};

/**
 * Limit the request rate.
 */
exports.deviceStateLimit = new rateLimit({
	windowMs: 10 * 1000,
	max: 3,
	statusCode: 429,
	message: 'Too many request. Please wait before getting the device state.',
});

exports.deviceConfigLimit = new rateLimit({
	windowMs: 20 * 1000,
	max: 1,
	statusCode: 429,
	message: 'Too many request. Please wait before sending a device configuration.',
});
