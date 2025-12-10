const { body } = require('express-validator');

const courseValidation = [
    body("title").isLength({ min: 2, max: 20 }),
    body('price').isInt()
];

const userValidation = [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

module.exports = { courseValidation, userValidation };