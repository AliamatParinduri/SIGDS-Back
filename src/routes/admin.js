const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

const isAdmin = require('../middleware/is-admin');

router.post('/login', isAdmin, [
    body("username").isLength({min: 2}).withMessage("minimal harus 2 karakter"),
    body("password").isLength({min: 4}).withMessage("minimal harus 4 karakter"),
], authController.postLogin);

module.exports = router;