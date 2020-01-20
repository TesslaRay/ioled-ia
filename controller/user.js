const _ = require('lodash');

/**
 * Returns the current authenticated user.
 * @param {{user: object}} req Request. Passport.js sets req.user object.
 * @param {object} res Respose.
 */
exports.currentUser = (req, res) => {
  console.log('[iOLED-API][currentUser][Request]', req.params, req.body);
  // If user is not authenticated, return null.
  if (!req.user) res.send();
  else {
    const user = _.pick(req.user, ['name', 'lastName', 'email', 'photo']);

    console.log('[iOLED-API][currentUser][Response]', user);
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
  console.log('[iOLED-API][logoutUser][Request]', req.params, req.body);
  req.logout();

  console.log('[iOLED-API][logoutUser][Response]', []);
  res.redirect('/');
};
