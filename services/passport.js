const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/User');

/**
 * Determines which data of the user object is stored in the session.
 * If authentication succeeds, a session will be established and maintained
 * via a cookie set in the user's browser. In order to support login sessions,
 * Passport will serialize and deserialize user instances to and from the session.
 * @param user The authenticated user object.
 * @param done The callback function used by passport.
 */
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// Tell passport to use the google strategy for oath.
passport.use(
	/** 
	 * Create a google strategy.
	 * @param clientID Public token. It identifies the app to google servers.
	 * @param clientSecret Private token to comunicate to the app.
	 * @param callbackURL Url to redirect after authentication.
	 */
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			// Destructure profile values.
			const {
				id: googleID,
				name: {familyName: lastName, givenName: name},
				emails: [{value: email}],
				photos: [{value: photo}],
			} = profile;

			// Search in the DB for the user.
			const existingUser = await User.findOne({googleID});
			// If the user exists, call passport done with the user.
			if (existingUser) {
				return done(null, existingUser);
			}

			// If th user doesnt, create a new user and call done with it.
			const user = await new User({googleID, name, lastName, email, photo}).save();
			done(null, user);
		}
	)
);
