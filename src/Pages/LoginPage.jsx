import "../SCSS/LoginPage.scss";
import { InputNumber } from "antd";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { getUserById } from "../API/ApiClient";

function LoginPage() {
  const [userId, setUserId] = useState(1);
  const { loggedUser, logUserIn, isLoggedIn } = useContext(AppContext);

  const handleUserChange = (value) => {
    setUserId(value);
  };

  const handleLogin = async () => {
    const user = await getUserById(userId);

    if (user) {
      logUserIn(user);
    } else {
      return;
    }
  };

  const inputStyle = {
    marginBottom: "20px",
  };

  return (
    <div className="login-page">
      <h1>Authenticate with your ID</h1>
      <InputNumber
        min={1}
        max={100}
        value={userId}
        onChange={handleUserChange}
        size="large"
        style={inputStyle}
      />
      <button className="btn" onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}

export default LoginPage;
