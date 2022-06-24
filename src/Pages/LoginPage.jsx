import "../SCSS/LoginPage.scss";
import { InputNumber } from "antd";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getStudentById, getLecturerById } from "../API/ApiClient";
import AppContext from "../Context/AppContext";
import { useToast } from "../hooks/useToast";

function LoginPage() {
  const [userId, setUserId] = useState(1);
  const { loggedUser, logUserIn, isLoggedIn } = useContext(AppContext);
  const { successToast, errorToast } = useToast();

  const handleUserChange = (value) => {
    setUserId(value);
  };

  const handleLogin = async () => {
    const user = await getStudentById(userId);

    if (user) {
      logUserIn(user, false);
    } else {
      errorToast();
      return;
    }
  };

  const handleLoginLecturer = async () => {
    const user = await getLecturerById(userId);

    if (user) {
      logUserIn(user, true);
    } else {
      errorToast();
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
      <div className="buttons-wrapper">
        <button className="btn" onClick={handleLogin}>
          Log in as a Student
        </button>
        <button className="btn red" onClick={handleLoginLecturer}>
          Log in as a Lecturer
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
