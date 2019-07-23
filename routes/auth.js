const express = require('express');
const router = express.Router();

// Import all controllers for authentication.
const {authRequest, authCallback, authRedirect} = require('../controller/auth');

// Router middleware to handle auth routes.
router.route('/auth/google').get(authRequest);
router.route('/auth/google/callback').get(authCallback, authRedirect);

// Export router to use it in the main app.
module.exports = router;
