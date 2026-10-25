import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const redirectByRole = (r) => {
    if (r === "student") navigate("/dashboard/student");
    else if (r === "executive") navigate("/dashboard/executive");
    else navigate("/dashboard/admin");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        if (!email || !password) {
          setError("Please enter your email and password.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Invalid email or password.");
          setLoading(false);
          return;
        }

        if (data.user.role !== role) {
          setError(`This account is registered as a ${data.user.role}. Please select "${data.user.role}" to continue.`);
          setLoading(false);
          return;
        }

        localStorage.setItem("clubx_token", data.token);
        localStorage.setItem("clubx_user", JSON.stringify(data.user));

        redirectByRole(data.user.role);
        setLoading(false);
        return;
      }

      if (role !== "student") {
        setError("Only students can sign up. Executive and Admin accounts are assigned by the system.");
        setLoading(false);
        return;
      }

      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "student" })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Try again.");
        setLoading(false);
        return;
      }

      const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem("clubx_token", loginData.token);
        localStorage.setItem("clubx_user", JSON.stringify(loginData.user));
        redirectByRole(loginData.user.role);
      } else {
        setIsLogin(true);
        setError("Account created successfully! Please log in.");
      }

    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
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
            : "Create a student account to join clubs and events."}
        </p>

        <div className="role-selector">
          <label>Continue as</label>
          <div className="role-options">
            {[
              { value: "student", label: "Student" },
              { value: "executive", label: "Executive" },
              { value: "admin", label: "Admin" },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                className={`role-option ${role === r.value ? "is-active" : ""}`}
                onClick={() => setRole(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

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

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Please wait..." : (isLogin ? "Log in" : "Sign up")}
          </button>
        </form>

        <p className="signup-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" className="link-btn" onClick={switchMode}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;