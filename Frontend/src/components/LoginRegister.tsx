import React, { useState } from "react";

const API_URL = "http://localhost:5000/api/auth";

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register panel
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchContent = () => {
    setIsLogin(!isLogin);
    setError(""); // To clear Error when switching slider
    setEmail("");
    setPassword("");
    const content = document.getElementById("content");
    if (!content) return;
    content.classList.toggle("active");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "login" : "register";
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message || "Something went wrong!");
      return;
    }

    if (isLogin) {
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      window.location.href = "/dashboard";
    } else {
      alert("Registration Successful! Please login.");
      switchContent(); // Switching to login panel after succefull Registration
    }
  };

  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      {/* Register Form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="header-text mb-4">
            <h1>Create Account</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-danger">{error}</p>}
          <button
            className="btn btn-primary w-50 mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
      </div>

      {/* Login Form */}
      <div className="col-md-6 right-box">
        <form onSubmit={handleSubmit}>
          <div className="header-text mb-4">
            <h1>Sign In</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Remember me</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>
          <button
            className="btn btn-primary w-50 mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>

      {/* Sliding Panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h1>Hello, Again</h1>
            <p>We are happy to see you back</p>
            <button className="btn btn-secondary w-50" onClick={switchContent}>
              Login
            </button>
          </div>
          <div className="switch-panel switch-right">
            <h1>Welcome</h1>
            <p>Join Our Unique Platform, Explore a New Experience</p>
            <button className="btn btn-secondary w-50" onClick={switchContent}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
