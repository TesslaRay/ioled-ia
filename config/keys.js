// ----- Keys configuration -----

// Select which set of credentials to return depending the enviroment variable.
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} 
else {
  module.exports = require('./dev')
}

