const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    console.log("Validation Errors:", errors.array());
    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors.array()
        });

    }

    next();

};

module.exports = validate;