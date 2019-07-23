const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./keys');
const routes = require('../routes');
const bodyParser = require('body-parser');
const {static} = require('express');

/**
 * Load express configuration
 * @module express/config
 * @param app The express app.
 */
//  Express configuration
module.exports = app => {
	// Use body-parser middleware.
	app.use(bodyParser.json());
	/* Important: follow this order to use express middlewares.
	 * 1.cookieParser
	 * 2.session
	 * 3.passport.initialize
	 * 4.passport.session
	 * 5.app.router
	 */
	app.use(
		cookieSession({
			name: 'session',

			// Time to expire in ms.
			maxAge: 60 * 60 * 1000,
			// Key to encrypt the cookie.
			keys: [keys.cookieKey],
			//secure: true,
			//httpOnly: true,
		})
	);

	/* Passport middleware to use cookie session.
	 * The user can be accessed by 'req.user' in the express request.
	 */
	app.use(passport.initialize());
	app.use(passport.session());

	// Use all routes
	app.use(routes);

	// Express configuration to serve production files.
	if (process.env.NODE_ENV === 'production') {
		console.log('Initializing app in production environment ...');
		app.use(static('client/build'));

		const path = require('path');
		app.get('*', (req, res) => {
			const rootPath = path.join(__dirname, '../');
			res.sendFile(path.resolve(rootPath, 'client', 'build', 'index.html'));
		});
	}
};
