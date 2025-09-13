import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "user" && password === "vasavi") {
      navigate("/user");
    } else if (role === "owner" && password === "vasavibakery") {
      navigate("/owner");
    } else {
      setError("❌ Invalid password!");
    }
  };

  return (
    <div className="login-container">
      <h2>🍴 Smart Canteen PrePay</h2>

      <div className="login-form">
        <label>
          Select Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </label>

        <label>
          Enter Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
