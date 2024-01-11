import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import profileImg from "../../assets/images/profile.png";
import Dropdown from "./Dropdown";

export default function Profile({ user }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    });
  }, []);

  const dropdownHandler = () => {
    setIsDropdown(!isDropdown);
  };

  const logout = () => {
    Cookies.remove("login");
    navigate("/login");
  };
  return (
    <div className="profile" ref={ref}>
      <div className="img">
        <img src={user?.img || profileImg} alt="" />
      </div>
      <div onClick={dropdownHandler} className="profile-body">
        <strong>
          {user?.firstName} {user?.lastName}
        </strong>
        <span>{user?.role}</span>
      </div>
      <div className="profile-btn">
        <button onClick={dropdownHandler}>
          <BiSolidDownArrow />
        </button>
      </div>
      {isDropdown && <Dropdown handler={logout} data={values.profileMenu} />}
    </div>
  );
}
