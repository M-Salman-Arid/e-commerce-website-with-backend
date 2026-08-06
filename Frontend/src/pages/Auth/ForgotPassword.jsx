import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { forgotPasswordAPI, verifyPasswordResetOTP, resetPasswordAPI } from "../../api/authAPI";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (e) => {

    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {

    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {

    setNewPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {

    setConfirmPassword(e.target.value);
  }

  const handleSendOTP = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      await forgotPasswordAPI(email);

      setSuccess("OTP sent successfully.");
      setStep(2);

    } catch (err) {

      setError(err.response?.data?.message);

    } finally {

      setLoading(false);

    }
  };

  const handleVerifyOTP = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      await verifyPasswordResetOTP(email, otp);

      setSuccess("OTP Verified");
      setStep(3);

    } catch (err) {

      setError(err.response?.data?.message);

    } finally {

      setLoading(false);

    }
  };

  const handleResetPassword = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {

      return setError("Passwords do not match");

    }

    try {

      setLoading(true);

      await resetPasswordAPI(email, newPassword);

      setSuccess("Password updated successfully.");

      setTimeout(() => {

        navigate("/login")

      }, 2000)

    } catch (err) {

      setError(err.response?.data?.message);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return <Loader />;
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email address and we'll send an otp to reset your password.
        </p>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}


        {step === 1 && (

          <form onSubmit={handleSendOTP} className="auth-form">

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your registered email"
              />

            </div>


            <button
              type="submit"
              className="auth-btn"
            >
              Send OTP
            </button>

          </form>

        )}

        {step === 2 && (

          <form onSubmit={handleVerifyOTP} className="auth-form">

            <div>
              <label>Email</label>

              <input
                value={email}
                readOnly
              />


            </div>

            <div>

              <label>OTP</label>

              <input
                value={otp}
                type="number"
                onChange={handleOtpChange}
                placeholder="Enter the OTP sent to your email"
                name="otp"
              />

            </div>


            <button className="auth-btn">
              Verify OTP
            </button>

          </form>

        )}

        {step === 3 && (

          <form onSubmit={handleResetPassword} className="auth-form">

            <div>

              <label>New Password</label>

              <div className="password-field">

                <input
                  type={showNewPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>

              </div>

            </div>

            <div>

              <label>Confirm Password</label>

              <div className="password-field">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>

              </div>

            </div>

            <button className="auth-btn">
              Update Password
            </button>

          </form>

        )}

        <div className="auth-link">

          Remember your password?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;