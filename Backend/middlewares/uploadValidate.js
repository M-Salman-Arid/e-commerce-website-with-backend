const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));

        }

    }

});

module.exports = {
    upload
};