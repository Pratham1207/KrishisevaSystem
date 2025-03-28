import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/LoginRegister.css";

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface LoginData {
  emailOrUsername: string;
  password: string;
}

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [loginData, setLoginData] = useState<LoginData>({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const switchContent = () => {
    setIsRegister(!isRegister);
    setError(null);
  };

  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          name: registerData.name,
          phone: registerData.phone,
          email: registerData.email,
          password: registerData.password,
          role: registerData.role || "farmer",
        }
      );

      toast.success("Registration successful! Please login.");
      switchContent(); // Switch to login form
      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Registration failed!";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          email: loginData.emailOrUsername,
          password: loginData.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed!";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          {isRegister ? (
            <form onSubmit={handleRegisterSubmit}>
              <h2>Create Account</h2>
              <p>Join Krishiseva and enhance your farming experience.</p>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Full Name"
                className="form-control"
                required
              />
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className="form-control"
                required
              />
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                placeholder="Phone Number"
                className="form-control"
              />
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                className="form-control"
                required
              />
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                className="form-control"
                required
              >
                <option value="" disabled>
                  Choose Your Role
                </option>
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
                <option value="csowner">Cold Storage Owner</option>
              </select>
              {error && <p className="error-message">{error}</p>}
              <button className="btn btn-success" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <h2>Sign In</h2>
              <p>Access your Krishiseva account.</p>
              <input
                type="text"
                name="emailOrUsername"
                value={loginData.emailOrUsername}
                onChange={handleLoginChange}
                placeholder="Email"
                className="form-control"
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="form-control"
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </div>

        <div className="auth-switch">
          <h1>{isRegister ? "Welcome Back!" : "Hello!"}</h1>
          <p>
            {isRegister
              ? "Already have an account? Login now!"
              : "New to Krishiseva? Register and explore more!"}
          </p>
          <button className="btn btn-secondary" onClick={switchContent}>
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
