/**
 * Production keys.
 * @description Production keys must be set as enviroment variables (Google App Engine).
 * @param {string} googleClientID - Needed to call the sing-in API.
 * @param {string} googleClientSecret - Needed for server-side operations.
 * @param {string} mongoURI - mlab database uri.
 * @param cookieKey - encryption key used for serialize user in passport.js.
 */

const JWT_SECRET = process.env.JWT_SECRET;
if (JWT_SECRET === undefined) {
  console.error("JWT_SECRET env value is not valid");
  process.exit(1);
}

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  jwtSecret: JWT_SECRET
};
