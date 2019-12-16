/**
 * Production keys. 
 * @description Production keys must be set as enviroment variables (Google App Engine).
 * @param {string} googleClientID - Needed to call the sing-in API.
 * @param {string} googleClientSecret - Needed for server-side operations.
 * @param {string} mongoURI - mlab database uri.
 * @param cookieKey - encryption key used for serialize user in passport.js.
 */
module.exports = {
	googleClientID: '384917616977-ki9fleqmcg3crte84alco425emkqpm05.apps.googleusercontent.com',
	googleClientSecret: '3Umot6DDe2pmIwp_lq-H7EH7',
	mongoURI: 'mongodb+srv://ioled:10L3D2019%21@ioled-cluster-biief.gcp.mongodb.net/test?retryWrites=true&w=majority',
	cookieKey: 'ioled'
};
