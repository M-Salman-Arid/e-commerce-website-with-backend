const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }

});

const sendOTPEmail = async ( email, name, otp ) => {

    try {

        await transporter.sendMail({

            from: `"E-Commerce" <${process.env.EMAIL}>`,

            to: email,

            subject: "Email Verification OTP",

            html: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

                    <h2>Hello ${name},</h2>

                    <p>Thank you for registering on our E-Commerce website.</p>

                    <p>Your verification OTP is:</p>

                    <h1 style="
                        letter-spacing:5px;
                        color:#007bff;
                        text-align:center;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP is valid for <b>10 minutes</b>.</p>

                    <p>Please do not share this OTP with anyone.</p>

                    <br>

                    <p>Regards,</p>

                    <h3>E-Commerce Team</h3>

                </div>
            `

        });

        console.log("✅ OTP Email Sent Successfully.");

    } catch (error) {

        console.error("❌ Email Sending Failed");
        console.error(error.message);

        throw error;

    }

};

const sendPasswordResetOTPEmail = async ( email, name, otp ) => {

    try {

        await transporter.sendMail({

            from: `"E-Commerce" <${process.env.EMAIL}>`,

            to: email,

            subject: "Password Reset OTP",

            html: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

                    <h2>Hello ${name},</h2>

                    <p>You have requested to reset your password.</p>

                    <p>Your password reset OTP is:</p>

                    <h1 style="
                        letter-spacing:5px;
                        color:#007bff;
                        text-align:center;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP is valid for <b>10 minutes</b>.</p>

                    <p>Please do not share this OTP with anyone.</p>

                    <br>

                    <p>Regards,</p>

                    <h3>E-Commerce Team</h3>

                </div>
            `

        });

        console.log("✅ Password Reset OTP Email Sent Successfully.");

    } catch (error) {

        console.error("❌ Email Sending Failed");
        console.error(error.message);

        throw error;

    }

};

module.exports = {
    sendOTPEmail,
    sendPasswordResetOTPEmail
};
