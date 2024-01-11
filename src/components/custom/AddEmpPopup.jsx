import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";

const AddEmpPopup = ({ setAddEmp, setEditEmp, add, email = null }) => {
  // Popup btns
  const [popupBtns, setPopupBtns] = useState([
    {
      id: 1,
      title: "admin",
    },
    {
      id: 2,
      title: "manager",
    },
    {
      id: 3,
      title: "base",
    },
  ]);
  const logdinUser = Cookies.get("login") && JSON.parse(Cookies.get("login"));

  useEffect(() => {
    if (logdinUser.role === "manager") {
      setPopupBtns([
        {
          id: 3,
          title: "base",
        },
      ]);
    }
  }, []);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  // close popup
  const closePopup = () => {
    setEditEmp ? setEditEmp(false) : null;
    setAddEmp ? setAddEmp(false) : null;
  };

  // select active btn

  // development area
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "base",
  });

  useEffect(() => {
    if (!add && email) {
      axios
        .get(`${values.url}/user/single?email=${email}`, {
          headers: {
            token,
          },
        })
        .then((d) => {
          setUserData(d.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setUserData((prev) => {
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

  const submitHandler = (e) => {
    if (add) {
      axios
        .post(`${values.url}/user/add`, userData, {
          headers: {
            token,
          },
        })
        .then(() => {
          closePopup();
          window.location.reload();
        })
        .catch((e) => {
          setErrors(e.response.data);
          console.log(e.response.data);
        });
    } else {
      axios
        .put(`${values.url}/user/update`, userData, {
          headers: {
            token,
          },
        })
        .then((d) => {
          closePopup();
        })
        .catch((e) => {
          setErrors(e.response.data);
        });
    }
  };

  const [isDelete, setIsDelete] = useState(false);
  const deleteHandler = () => {
    axios
      .delete(`${values.url}/user/delete?id=${userData._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsDelete(false);
        closePopup();
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="add_emp">
      <div className="formBox">
        {/* Heading */}
        <div className="heading">
          <p className="jakarta">
            {(add && "Create New ") || "Edit"} Employee
          </p>

          {/* Icon */}
          <svg
            onClick={closePopup}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M10.5807 19.4194L19.4196 10.5806"
              stroke="#84818A"
              strokeWidth="1.875"
              strokeLinecap="round"
            />
            <path
              d="M10.5807 10.5806L19.4196 19.4194"
              stroke="#84818A"
              strokeWidth="1.875"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* border */}
        <div
          className="horizontal_line"
          style={{ marginTop: "10px", marginBottom: "5px" }}
        ></div>

        {/* Box Header */}
        <div className="box_header">
          <h2 className="jakarta">Employee Details</h2>
          <p className="jakarta">
          Enter all the information and finally select the security level
          </p>
        </div>

        {/* form */}
        <form>
          {/* nameBox */}
          <div className="nameBox">
            {/* name */}
            <div className={`box ${(errors.firstName && "error") || ""}`}>
              <label htmlFor="name" className="jakarta">
                Name
              </label>
              <input
                value={userData?.firstName}
                name="firstName"
                type="text"
                placeholder="Name"
                className="jakarta"
                onChange={changeHandler}
              />
              {errors.firstName && <span>{errors.firstName.msg}</span>}
            </div>

            {/* Cognome */}
            <div className={`box ${(errors.lastName && "error") || ""}`}>
              <label htmlFor="Cognome" className="jakarta">
                Surname
              </label>
              <input
                value={userData?.lastName}
                name="lastName"
                type="text"
                placeholder="Surname"
                className="jakarta"
                onChange={changeHandler}
              />
              {errors.lastName && <span>{errors.lastName.msg}</span>}
            </div>
          </div>

          {/* nameBox */}
          <div className="mailPass">
            {/* name */}
            <div className={`box ${(errors.email && "error") || ""}`}>
              <label htmlFor="name" className="jakarta">
                Email
              </label>
              <input
                type="email"
                value={userData?.email}
                name="email"
                placeholder="email@gmail.com"
                className="jakarta"
                onChange={changeHandler}
              />
              {errors.email && <span>{errors.email.msg}</span>}
            </div>

            {/*Cognome */}

            <div
              style={{ opacity: `${(!add && ".3") || "1"}` }}
              className={`box ${(errors.password && "error") || ""}`}
            >
              <label htmlFor="Cognome" className="jakarta">
                Password
              </label>
              <input
                disabled={!add}
                type="text"
                value={userData?.passwrod}
                name="password"
                placeholder="1234passw"
                className="jakarta"
                onChange={changeHandler}
              />
              {errors.password && <span>{errors.password.msg}</span>}
            </div>
          </div>
        </form>

        {/* border */}
        <div className="horizontal_line" style={{ marginBottom: "5px" }}></div>

        {/* Buttons */}
        <div className="security_btns">
          <h2>Security Level</h2>

          <div className="btns">
            {popupBtns?.map((btn) => (
              <button
                onClick={() => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      role: btn.title,
                    };
                  });
                }}
                key={btn.id}
                className={`jakarta ${
                  btn.title === userData?.role ? "active" : ""
                }`}
              >
                {btn.title}
              </button>
            ))}
          </div>
        </div>

        {/* border */}
        <div className="horizontal_line"></div>

        {/* Submit Btns */}
        <div className="submit_btns">
          {/* cancel btn */}
          <button
            className="cancel jakarta"
            onClick={() => {
              (add && closePopup()) || setIsDelete(true);
            }}
          >
            {(add && "Cancel") || "Remove"}
          </button>

          {/* submit btn */}
          <button onClick={submitHandler} className="next jakarta">
            {(add && "Add") || "Save Changes"}
          </button>
        </div>
      </div>

      {isDelete && (
        <div className="isdelete">
          <h2 className="jakarta">Do you want to remove {userData?.firstName}?</h2>
          <p className="jakarta">The user will no longer be able to log in</p>
          <div className="buttons">
            <button
              onClick={() => {
                setIsDelete(false);
                closePopup();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button onClick={deleteHandler} className="delete-btn btn">
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmpPopup;
