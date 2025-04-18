const express = require('express');
const {sendEmail, viewMail} = require('../controller/emailContrl');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("emailForm", { error: '' });
});

router.post('/sendmail', sendEmail);

// Use only the controller version
router.get('/viewMail', viewMail);

// router.get('/viewMail', viewMail );

module.exports = router;