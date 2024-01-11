import { NavLink } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import "../styles/Login/login.scss";

const Login = () => {
  return (
    <div className="loginPage">
      {/* logo */}
      <div className="logo">
        <NavLink to="/">
          <img src="./images/login-logo.svg" alt="logo" />
        </NavLink>
      </div>

      {/* Overlay One */}
      <div className="overlay_one">
        <img src="./images/login-overlay-1.png" alt="" />
      </div>

      {/* Overlay One */}
      <div className="overlay_two">
        <img src="./images/login-overlay-2.png" alt="" />
      </div>

      {/* Overlay One */}
      <div className="overlay_three">
        <img src="./images/login-overlay-3.png" alt="" />
      </div>

      {/* Form */}
      <div className="login_form">
        {/* Login Box */}
        <div className="form_box">
          {/* heading */}
          <div className="heading">
            <h1 className="jakarta">Benvenuto</h1>
          </div>

          {/* form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
