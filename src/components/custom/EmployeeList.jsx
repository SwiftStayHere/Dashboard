import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import values from "../../../values";
import "../styles/Dashboard/dashboard.scss";
import EmployeeCard from "./EmployeeCard";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeHeading from "./EmployeeHeading";

const EmployeeList = () => {
  const [isload, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    axios
      .get(`${values.url}/user/all`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsLoading(false);
        setUsers(d.data);
        setActiveUsers(d.data);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="employee_list">
      <EmployeeHeading />
      <EmployeeFilter setActiveUsers={setActiveUsers} users={users} />

      {/* Employees Card */}
      {(isload && (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )) || (
        <React.Fragment>
          {activeUsers.map((d, i) => (
            <EmployeeCard data={d} key={i} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default EmployeeList;
