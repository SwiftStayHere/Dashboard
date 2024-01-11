import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import HomeBtm from "../home/HomeBtm";
import HomeCounter from "../home/HomeCounter";
import HomeRecords from "../home/HomeRecords";
import HomeTopBar from "../home/HomeTopBar";

export default function Home() {
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
    <div className="home">
      <div className="container">
        <HomeTopBar user={user} />
        <HomeCounter />
        <HomeRecords />
        <HomeBtm />
      </div>
    </div>
  );
}
