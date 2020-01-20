const passport = require("passport");

/**
 * Send the user to google oauth flow to log in with a google account.
 * @description To export 'passport.authenticate', it must be invoked with (req, res, next).
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.authRequest = (req, res, next) => {
  console.log("here in auth");
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
};

// Redirect to the server with the session established.
exports.authCallback = (req, res, next) => {
  console.log("here in auth callback");
  console.log(req.params, req.body, req.headers, req.query);
  passport.authenticate("google")(req, res, next);
};

// Auth callback redirect.
exports.authRedirect = (req, res) => {
  res.redirect("/dashboard");
};
