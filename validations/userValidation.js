const Joi = require('joi');

/**
 * @schema registerSchema
 * @desc Schema to validate the registration inputs.
 * @param {string} name - User's name (max 30 characters)
 * @param {string} email - User's email (must be a valid email format)
 * @param {string} password - User's password (must be at least 6 characters)
 * @param {boolean} isAdmin - Optional field to specify if the user is an admin
 */
const registerSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean()
});

/**
 * @schema loginSchema
 * @desc Schema to validate the login inputs.
 * @param {string} email - User's email (must be a valid email format)
 * @param {string} password - User's password (must be at least 6 characters)
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = { registerSchema, loginSchema };
