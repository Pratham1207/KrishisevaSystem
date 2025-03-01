import React from "react";

const LoginRegister: React.FC = () => {
  const switchContent = () => {
    const content = document.getElementById("content");
    if (!content) return;
    content.classList.toggle("active");
  };

  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      <div className="col-md-6 d-flex justify-content-center">
        <form>
          <div className="header-text mb-4">
            <h1>Create Account</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-lg"
          />
          <button className="btn btn-primary w-50 mt-3">Register</button>
        </form>
      </div>

      <div className="col-md-6 right-box">
        <form>
          <div className="header-text mb-4">
            <h1>Sign In</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-lg"
          />
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Remember me</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>
          <button className="btn btn-primary w-50 mt-3">Login</button>
        </form>
      </div>

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
