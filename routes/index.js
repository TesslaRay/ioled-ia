const express = require('express');
const app = express();

// ----- Import all routes here -----
const authRoute = require('./auth');
const userRoute = require('./user');
const deviceRoute = require('./device');
const googleRoute = require('./google');
const predictRoute = require('./predict');
const imageRoute = require('./images');


// ----- Use all routes here -----
app.use(authRoute);
app.use(userRoute);
app.use(deviceRoute);
app.use(googleRoute);
app.use(predictRoute);
app.use(imageRoute);

// Export app to require it in the main app.
module.exports = app;
