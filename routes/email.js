const express = require('express');
const sendEmail = require('../controller/emailContrl');

const router = express.Router();

router.post('/sendmail', sendEmail);

module.exports = router;