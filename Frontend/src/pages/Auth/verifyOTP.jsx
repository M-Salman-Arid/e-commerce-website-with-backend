import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTPAPI } from '../../api/authAPI';

const VerifyOTP = () => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!otp) {
            return setError("Please enter the OTP.");
        }

        if (otp.length !== 6) {
            return setError("OTP must be 6 digits.");
        }

        try {

            setLoading(true);

            const token = sessionStorage.getItem(
                "verificationToken"
            );

            await verifyOTPAPI({
                otp,
                verificationToken: token
            });

            setSuccess("Email verified successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid OTP."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Verify OTP</h2>

                <p>
                    Enter the 6-digit code sent to
                    <br />
                    <strong></strong>
                </p>

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label>OTP</label>

                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/\D/g, ""))
                            }
                        />

                    </div>

                    <button
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

                <div className="auth-link">

                    Didn't receive the code?

                    {" "}

                    <Link to="#">
                        Resend OTP
                    </Link>

                </div>

            </div>

        </div>

    );

};

export default VerifyOTP;