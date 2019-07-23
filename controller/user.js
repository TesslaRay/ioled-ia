const _ = require('lodash');

/**
 * Returns the current authenticated user.
 * @param {{user: object}} req Request. Passport.js sets req.user object.
 * @param {object} res Respose.
 */
exports.currentUser = (req, res) => {
	// If user is not authenticated, return null.
	if (!req.user) res.send();
	
	else {
		const user = _.pick(req.user, ['name', 'email', 'photo']);
		res.status(200).send(user);
	}
};

/**
 * Use passport.js middleware to logout.
 * @param {{logout: function}} req Request.
 * @param {object} res Response.
 * @see http://www.passportjs.org/docs/logout/
 */
exports.logoutUser = (req, res) => {
	req.logout();
	res.redirect('/');
};
