import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPasswordAPI, verifyPasswordResetOTP, resetPasswordAPI } from "../../api/authAPI";

const ForgotPassword = () => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (newPassword !== confirmPassword) {

      return setError("Passwords do not match");

    }

    try {

      setLoading(true);

      await resetPasswordAPI(email, newPassword);

      setSuccess("Password updated successfully");

    } catch (err) {

      setError(err.response?.data?.message);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <div className="loading">Loading...</div>;
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

          <form onSubmit={handleSendOTP}>

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <button type="submit">
              Send OTP
            </button>

          </form>

        )}

        {step === 2 && (

          <form onSubmit={handleVerifyOTP}>

            <label>Email</label>

            <input
              value={email}
              readOnly
            />

            <label>OTP</label>

            <input
              value={otp}
              onChange={handleOtpChange}
            />

            <button>
              Verify OTP
            </button>

          </form>

        )}

        {step === 3 && (

          <form onSubmit={handleResetPassword}>

            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <button>
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