import React from "react";
import "../styles/login.css";
import icon from "../assets/google.png";

const Login = ({ loginHandler }) => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-box" onClick={loginHandler}>
          <h1>Sign in with</h1>
          <img src={icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
