import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import values from "../../../values";

export default function LoginForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    setIsloading(true);
    axios
      .post(`${values.url}/user`, data)
      .then((d) => {
        console.log(d.data);
        Cookies.set("login", JSON.stringify(d.data.userObject));
        setIsloading(false);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setIsloading(false);
        setErrors(e.response.data);
      });
  };

  const changeHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: null,
      };
    });
  };

  return (
    <form onSubmit={submitHandler}>
      {/* email */}
      <div className={`box ${(errors.email && "error") || ""}`}>
        <label htmlFor="mail" className="jakarta">
          Email
        </label>
        <input
          type="email"
          id="mail"
          placeholder="Email"
          className="jakarta"
          value={data.email}
          name="email"
          onChange={changeHandler}
        />
        {errors.email && <span>{errors.email.msg}</span>}
      </div>

      {/* password */}
      <div className={`box ${(errors.password && "error") || ""}`}>
        <label htmlFor="password" className="jakarta">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="jakarta"
          value={data.password}
          name="password"
          onChange={changeHandler}
        />
        {errors.password && <span>{errors.password.msg}</span>}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "35px",
        }}
      >
        {(isLoading && (
          <button disabled className="jakarta spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </button>
        )) || <button className="jakarta">Login</button>}
      </div>
    </form>
  );
}
