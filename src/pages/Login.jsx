import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/global.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Temporary demo account until backend authentication is ready.
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("curatorLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setMessage("Incorrect username or password.");
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-logo">
          Website Index
        </Link>
      </header>

      <main className="login-main">
        <section className="login-panel">
          <h1>Curator Login</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Sign In</button>
          </form>

          {message && <p className="login-message">{message}</p>}
        </section>
      </main>

      <footer className="login-footer">
        <Link to="/about">About</Link>
        <Link to="/contacts">Contacts</Link>
      </footer>
    </div>
  );
}
