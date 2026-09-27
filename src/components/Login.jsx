import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ============ LOGIN ============
    if (isLogin) {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      // Fake login (backend নেই — localStorage-এ save)
      const user = {
        email,
        name: email.split("@")[0],
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("clubx_user", JSON.stringify(user));
      navigate("/");
      return;
    }

    // ============ SIGNUP ============
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Fake signup — localStorage-এ save
    const newUser = {
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("clubx_user", JSON.stringify(newUser));
    navigate("/");
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-box">
        <span className="eyebrow">{isLogin ? "Log in" : "Sign up"}</span>

        <h1>{isLogin ? "Welcome back." : "Join ClubX."}</h1>

        <p className="login-box__lead">
          {isLogin
            ? "Log in to your ClubX account."
            : "Create an account to join clubs and events."}
        </p>

        <form onSubmit={onSubmit}>

          {!isLogin && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@university.edu"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn--primary">
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="signup-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="link-btn"
            onClick={switchMode}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;