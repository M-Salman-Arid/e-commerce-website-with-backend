import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../api/authAPI"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

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

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {

            const data = await loginUser(formData);
            setSuccess(data.message);

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {

            setError(
                error.response?.data?.message || "Something went wrong."
            );

            console.error(error);

        }
    };
    

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Welcome Back 👋</h2>

                <p>
                    Login to continue shopping.
                </p>

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="remember">

                        <label>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />

                            Remember Me
                        </label>

                        <Link
                            to="/forgot-password"
                            className="forgot-link"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-link">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default Login;