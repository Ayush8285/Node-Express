const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');

const router = express.Router();

router.post('/login' , handleUserLogin);
router.post('/', handleUserSignup);

module.exports = router;