import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { authenticate } from "../data/demoUsers";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const redirectByRole = (r) => {
    if (r === "student") navigate("/dashboard/student");
    else if (r === "executive") navigate("/dashboard/executive");
    else navigate("/dashboard/admin");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ============ LOGIN ============
    if (isLogin) {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      const result = authenticate(email, password, role);

      if (!result.success) {
        setError(result.error);
        return;
      }

      const user = {
        email: result.user.email,
        role: result.user.role,
        name: result.user.name,
        studentId: result.user.studentId || null,
        department: result.user.department || null,
        club: result.user.club || null,
        position: result.user.position || null,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("clubx_user", JSON.stringify(user));
      redirectByRole(user.role);
      return;
    }

    // ============ SIGNUP ============
    if (role !== "student") {
      setError(
        "Only students can sign up. Executive and Admin accounts are assigned by the system."
      );
      return;
    }

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

    // Check demo accounts — cannot signup with existing email
    const existsInDemo = ["student@clubx.com", "executive@clubx.com", "admin@clubx.com"];
    if (existsInDemo.includes(email.toLowerCase().trim())) {
      setError("This email is already registered.");
      return;
    }

    const customUsers = JSON.parse(
      localStorage.getItem("clubx_custom_users") || "[]"
    );
    if (customUsers.find((u) => u.email === email.toLowerCase().trim())) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      email: email.toLowerCase().trim(),
      password,
      role: "student",
      name,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "clubx_custom_users",
      JSON.stringify([...customUsers, newUser])
    );

    localStorage.setItem(
      "clubx_user",
      JSON.stringify({
        email: newUser.email,
        role: "student",
        name,
        loggedInAt: new Date().toISOString(),
      })
    );

    navigate("/dashboard/student");
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const quickFill = (r) => {
    setRole(r);
    const creds = {
      student: ["student@clubx.com", "student123"],
      executive: ["executive@clubx.com", "executive123"],
      admin: ["admin@clubx.com", "admin123"],
    };
    setEmail(creds[r][0]);
    setPassword(creds[r][1]);
    setIsLogin(true);
    setError("");
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

        {/* ROLE SELECTOR */}
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

          <button type="submit" className="btn btn--primary">
            {isLogin ? "Log in" : "Sign up"}
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