import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import BannerCards from "../custom/BannerCards";
import EmployeeList from "../custom/EmployeeList";
import HomeTopBar from "../home/HomeTopBar";
import "../styles/Dashboard/dashboard.scss";

const Dashboard = () => {
  const [user, setUser] = useState({});

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

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
    <div className="dashboard">
      <HomeTopBar user={user} />
      <BannerCards />
      <EmployeeList />
    </div>
  );
};

export default Dashboard;
