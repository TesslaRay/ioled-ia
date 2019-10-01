/**
 * Production keys. 
 * @description Production keys must be set as enviroment variables (Google App Engine).
 * @param {string} googleClientID - Needed to call the sing-in API.
 * @param {string} googleClientSecret - Needed for server-side operations.
 * @param {string} mongoURI - mlab database uri.
 * @param cookieKey - encryption key used for serialize user in passport.js.
 */
module.exports = {
	googleClientID: '1078573493253-sfi309avlkufe8oiqbgre2qdppna5183.apps.googleusercontent.com',
	googleClientSecret: 'OgKFigx0LevXFSWial-l_EZ7',
	mongoURI: 'mongodb+srv://tessla:macarena100@ioled-cluster-xkzhy.gcp.mongodb.net/test?retryWrites=true&w=majority',
	cookieKey: 'ioled'
};
