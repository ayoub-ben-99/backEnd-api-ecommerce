const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth');
const { registerSchema, loginSchema } = require('../validations/userValidation');
const validate = require('../middleware/validate');

router.post('/register',validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
