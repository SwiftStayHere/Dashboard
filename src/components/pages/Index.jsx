import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import values from "../../../values";
import ThemeContext from "../context/ThemeContext";
import Header from "../header/Header";
import Sidebar from "../header/Sidebar";

export default function Index() {
  const [padding, setPadding] = useState(0);
  const [isFull, setIsFull] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const nav = document.getElementById("nav");
    setPadding(nav.offsetWidth);
  }, [isFull]);
  const cookie = Cookies.get("login");
  const token = (cookie && JSON.parse(cookie).token) || "";

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${values.url}/user`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setUser(d.data);
      })
      .catch((e) => {
        console.error(e.response);
      });
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ user }}>
        <div
          style={{
            paddingLeft: `${padding}px`,
          }}
          className="main"
        >
          <Header />
          <div className="main-body">
            <Outlet />
          </div>
        </div>
        <Sidebar isFull={isFull} setIsFull={setIsFull} />
      </ThemeContext.Provider>
    </>
  );
}
