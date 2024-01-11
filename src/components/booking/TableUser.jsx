import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdCall } from "react-icons/md";
import values from "../../../values";
import Input from "./Input";
import axios from "axios";

export default function TableUser({ data, onRowClick,setCurrentUser,getuser}) {
  const [isDetails, setIsDetails] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [td, setTD] = useState([]);

  async function renderGetUserData() {
    await axios.get(`${values.url}/booking/user`)
      .then((response) => {
        setTD(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    renderGetUserData();
  }, [getuser]);

  // console.log(td);

  const selectHandler = (e) => {
    setTD((prevTD) =>
      prevTD.map((item) =>
        item.id === e.id ? { ...item, select: !item.select } : item
      )
    );
  };

  const [isDel, setIsDel] = useState(false);
  const del = useRef(null);
  const tbd = useRef(null);

  const contexHandler = (e, s, id) => {
    if (s) {
      e.preventDefault();
      const top = tbd.current.getBoundingClientRect().top;
      del.current.style.top = `${e.clientY - top}px`;
      setIsDel(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (del.current && !del.current.contains(e.target)) {
        setIsDel(false);
      }
    });
  }, []);
  return (
    <table className="table table-user">
      <thead>
        <tr className="th">
          <th>#</th>
          {data?.th.map((d) => (
            <th key={d}>
              <div className="inner">
                <span>{d}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody ref={tbd}>
        {console.log(td)}
        {td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              onRowClick(d);
              data.setIsIndex(i);
              setCurrentUser(d._id);
              window.isIndex = i;
            }}
            onContextMenu={(e) => contexHandler(e, d.select, d.id)}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td className="selc" onClick={() => selectHandler(d)}>
              {(d.select && <BsCheckLg />) || (i < 9 && "0" + (i + 1)) || i + 1}
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === id)) {
                  if (data.isIndex === i) {
                    console.log(data.isIndex);
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    setCurrentUser(d._id);
                    window.isIndex = i;
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                }
              }}
            >
              <Input data={{ value: d.id }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "fName")) {
                  if (data.isIndex === i) {
                    console.log(data.isIndex);
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    setCurrentUser(d._id);
                    window.isIndex = i;
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      setCurrentUser(d._id);
                      window.isIndex = i;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("fName");
                data.detailsHandler(false);
              }}
              className="user-table"
            >
              <Input data={{ value: d.fName }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "lName")) {
                  if (data.isIndex === i) {
                    console.log(data.isIndex);
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    setCurrentUser(d._id);
                    window.isIndex = i;
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      setCurrentUser(d._id);
                      window.isIndex = i;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("lName");
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.lName }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "email")) {
                  if (data.isIndex === i) {
                    console.log(data.isIndex);
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    setCurrentUser(d._id);
                    window.isIndex = i;
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      setCurrentUser(d._id);
                      window.isIndex = i;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("email");
                data.detailsHandler(false);
              }}
              className="email"
            >
              {" "}
              <Input data={{ value: d.email }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "phone")) {
                  if (data.isIndex === i) {
                    console.log(data.isIndex);
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    setCurrentUser(d._id);
                    window.isIndex = i;
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      setCurrentUser(d._id);
                      window.isIndex = i;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("phone");
                data.detailsHandler(false);
              }}
              className="phone"
            >
              <div className="in">
                <MdCall /> <Input data={{ value: d.phone }} />
              </div>
            </td>
            <td
              onClick={() => {
                if (data.isIndex === i) {
                  console.log(data.isIndex);
                  data.detailsHandler(!data.isDetails);
                } else {
                  data.setIsIndex(i);
                  setCurrentUser(d._id);
                  window.isIndex = i;
                  data.detailsHandler(true);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("true");
                data.detailsHandler(false);
              }}
            >
              <div className="inner">
                <strong>{moment(d.lastQuoteSent).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.lastQuoteSent).format("HH:MM")}</span>
              </div>
            </td>
            <td
              onClick={() => {
                if (data.isIndex === i) {
                  console.log(data.isIndex);
                  data.detailsHandler(!data.isDetails);
                } else {
                  data.setIsIndex(i);
                  setCurrentUser(d._id);
                  window.isIndex = i;
                  data.detailsHandler(true);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("quateSend");
                data.detailsHandler(false);
              }}
            >
              {d.quoteSent}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
