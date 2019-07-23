const express = require('express');
const mongoose = require('mongoose');
// Local server configuration.
const keys = require('./config/keys');
const serverConfig = require('./config/server');
const expressConfig = require('./config/express');
// Include passport configuration.
require('./services/passport');

// Create the express app and load all middlewares and configurations.
const app = express();
expressConfig(app);

// Connect to the database.
mongoose.connect(keys.mongoURI);

// Start the app in the given port.
app.listen(serverConfig.PORT);
