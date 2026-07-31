import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
    const { token } = useParams();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log({
            token,
            password: formData.password,
        });

        // Replace with Axios API later

        setSuccess("Password reset successfully.");
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h2>Reset Password 🔒</h2>

                <p>
                    Enter your new password below.
                </p>

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label>New Password</label>

                        <div className="password-field">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                    </div>

                    <div>

                        <label>Confirm Password</label>

                        <div className="password-field">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Reset Password
                    </button>

                </form>

                <div className="auth-link">

                    Back to

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ResetPassword;