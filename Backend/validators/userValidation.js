
const {body, validationResult} = require('express-validator');

const validateProfileUpdate = [

    body("name")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),

    body("phone")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone must be between 10 and 15 characters")

]


const validatePasswordChange = [

    body("newPassword")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character")
]

module.exports = {
    validateProfileUpdate,
    validatePasswordChange
}
