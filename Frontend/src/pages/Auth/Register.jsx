import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if ( !formData.name || !formData.email || !formData.password || !formData.confirmPassword ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {

      const { data } = await registerUser(formData);

      setSuccess(data.message);

      sessionStorage.setItem( "verificationToken", data.token );

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: formData.email
          }
        });
      }, 1000);

    } catch (error) {
      setError( error.response?.data?.message || "Something went wrong." );
    }

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account 🚀</h2>

        <p>
          Register to start shopping with us.
        </p>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div>

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Password</label>

            <div className="password-field">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
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
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
                placeholder="Confirm password"
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
                  ? <FaEye />
                  : <FaEyeSlash />}
              </button>

            </div>

          </div>

          <div className="remember">

            <label>

              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />

              I agree to the Terms & Conditions

            </label>

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>

        </form>

        <div className="auth-link">

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;