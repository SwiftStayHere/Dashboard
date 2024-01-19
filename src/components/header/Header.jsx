import { useContext, useEffect, useRef, useState } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import values from "../../../values";
import Dropdown from "../basic/Dropdown";
import Profile from "../basic/Profile";
import Search from "../basic/Search";
import ThemeContext from "../context/ThemeContext";

export default function Header() {
  const [isNotifix, setIsNotific] = useState(false);
  const ref = useRef(null);

  const { user } = useContext(ThemeContext);

  const [title, setTitle] = useState("");

  let { pathname } = useLocation();

  pathname = pathname.replace("/", "");
  useEffect(() => {
    if (pathname === "setting") {
      setTitle("Settings");
    } else if (pathname === "transport") {
      setTitle("Transport");
    } else if (pathname.includes("hotel")) {
      setTitle("Hotel Management");
    } else if (pathname === "module") {
      setTitle("Modules");
    }else if(pathname === ""){
      setTitle("Dashboard");
    }else if(pathname ==="booking"){
      setTitle("Quote Requests");
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsNotific(false);
      }
    });
  }, []);

  const notificHandler = () => {
    setIsNotific(!isNotifix);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header-title">
          <h3>{title || "Deshboard"}</h3>
        </div>
        <div className="header-form">
          <Search />
        </div>
        <div className="header-right">
          <div ref={ref} className="notific">
            <button onClick={notificHandler}>
              <RiNotification2Fill />
              <span>5</span>
            </button>
            {isNotifix && <Dropdown data={values.notific} />}
          </div>
          <Profile user={user} />
        </div>
      </div>
    </header>
  );
}
