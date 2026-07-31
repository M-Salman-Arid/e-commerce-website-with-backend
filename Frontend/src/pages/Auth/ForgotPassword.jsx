import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    console.log(email);

    // Replace this with your backend API later
    setSuccess(
      "If an account exists with this email, a password reset link will be sent."
    );
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Send Reset Link
          </button>

        </form>

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