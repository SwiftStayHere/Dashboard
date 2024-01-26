import { NavLink } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import "../styles/Login/login.scss";

const Login = () => {
  return (
    <div className="loginPage">
      {/* logo */}
      <div className="logo loginNav">
        <NavLink to="/">
          <img src="./images/logo.png" alt="logo" height={80} />
        </NavLink>
        <h1>Swiftstay</h1>
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
        <img src="./images/login-overlay-3-overlay.png" alt="" />
      </div>

      {/* Form */}
      <div className="login_form">
        {/* Login Box */}
        <div className="form_box">
          {/* heading */}
          <div className="heading">
            <h1 className="jakarta">Welcome</h1>
            <p className="red-text">If you are not a registered user just press "<span className="blue-text">Login</span>"</p>
          </div>

          {/* form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
