import axios from "axios";
import moment from "moment";
import "moment/locale/it";
import { createRef, useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Loading from "../basic/Loading";
import Input from "../booking/Input";

export default function ModuleTable({ data, searchData, active }) {
  const navigate = useNavigate();
  const [td, setTD] = useState([]);
  const [mainTD, setMainTD] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const th = [
    "ID",
    "Module Name",
    "Modified By",
    "Total Requests",
    "Requests Pending",
  ];

  const formatDateToItalian = (dateString) => {
    const months = [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dic",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  const [isFocus, setIsFocus] = useState(false);

  const inp = useRef(td.map(() => createRef()));
  const [index, setIndex] = useState(null);

  const addPriceHandler = (itemId, newPrice, i) => {
    setTD((prevTD) => {
      // Find the item with the given itemId
      const updatedTD = prevTD.map((item) => {
        if (item.id === itemId) {
          // Return a new item object with the updated price
          return { ...item, price: newPrice, added: "Marco" };
        }
        return item; // Return unchanged item for other items
      });
      return updatedTD;
    });
    setIndex(i);
  };

  useEffect(() => {
    moment.locale("it"); // Set Moment.js to use Italian locale
  }, []);

  useEffect(() => {
    if (index || index === 0) {
      inp.current[index].current.childNodes[1].focus();
    }
  }, [index]);

  useEffect(() => {
    axios
      .get(`${values.url}/module`)
      .then((d) => {
        setTD(d.data);
        setMainTD(d.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  // select handler
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

  useEffect(() => {
    if (searchData) {
      const filteredData = mainTD.filter(
        (item) =>
          item.name.toLowerCase().includes(searchData.toLowerCase()) ||
          item.id.toString().includes(searchData)
      );
      setTD(filteredData);
    } else {
      setTD(mainTD);
    }
  }, [searchData]);

  useEffect(() => {
    if (active === "Recentemente Aggiunti") {
      const filteredData = mainTD.filter((item) => {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return new Date(mainTD[0].createdAt).getTime() >= lastWeek;
      });

      setTD(filteredData);
    } else {
      setTD(mainTD);
    }
  }, [active]);

  return (
    <>
      {(isLoading && <Loading />) || (
        <table className="table table-module" id="table">
          <thead>
            <tr className="th">
              <th>#</th>
              {th.map((d) => (
                <th key={d}>
                  <div className="inner">
                    <span>{d}</span>
                    <div className="icon">
                      <GoTriangleUp />
                      <GoTriangleDown />
                    </div>
                  </div>
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody ref={tbd}>
            <div ref={del} className={`buttons ${(isDel && "show") || ""}`}>
              <button>Delete</button>
            </div>
            {td.map((d, i) => (
              <tr
                key={i}
                onClick={() => {
                  data.setIsIndex(i);
                }}
                className={`${(data.isIndex === i && "active") || ""}`}
              >
                <td
                  onContextMenu={(e) => contexHandler(e, d.select, d.id)}
                  className="selc"
                  onClick={() => selectHandler(d)}
                >
                  {(d.select && <BsCheckLg />) ||
                    (i < 9 && "0" + (i + 1)) ||
                    i + 1}
                </td>
                <td>
                  <Input data={{ value: d.id }} />
                </td>
                <td
                  onClick={(e) => {
                    if (!isFocus || !(isFocus === "name")) {
                      if (data.isIndex === i) {
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(i);
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
                          data.detailsHandler(true);
                          e.target.blur();
                        }
                      } else {
                        data.detailsHandler(false);
                      }
                    }
                  }}
                  onDoubleClick={(e) => {
                    setIsFocus("name");
                    data.detailsHandler(false);
                  }}
                  className="name"
                >
                  <Input data={{ value: d.name }} />
                </td>
                <td
                  onClick={() => {
                    if (data.isIndex === i) {
                      data.detailsHandler(!data.isDetails);
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                    }
                  }}
                >
                  <div
                    onClick={() => {
                      if (data.isIndex === i) {
                        data.detailsHandler(!data.isDetails);
                      } else {
                        data.setIsIndex(i);
                        data.detailsHandler(true);
                      }
                    }}
                    className="inner"
                  >
                    <strong>{formatDateToItalian(d?.updatedAt)}</strong>{" "}
                    <span>
                      {d?.userId?.firstName} {d?.userId?.lastName}
                    </span>
                  </div>
                </td>

                <td
                  onClick={(e) => {
                    if (!isFocus || !(isFocus === "citta")) {
                      if (data.isIndex === i) {
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(i);
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
                          data.detailsHandler(true);
                          e.target.blur();
                        }
                      } else {
                        data.detailsHandler(false);
                      }
                    }
                  }}
                  onDoubleClick={(e) => {
                    setIsFocus("citta");
                    data.detailsHandler(false);
                  }}
                >
                  {" "}
                  <Input data={{ value: d.totalRequ }} />
                </td>
                <td
                  onClick={(e) => {
                    if (!isFocus || !(isFocus === "trastorto")) {
                      if (data.isIndex === i) {
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(i);
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
                          data.detailsHandler(true);
                          e.target.blur();
                        }
                      } else {
                        data.detailsHandler(false);
                      }
                    }
                  }}
                  onDoubleClick={(e) => {
                    setIsFocus("trastorto");
                    data.detailsHandler(false);
                  }}
                >
                  <Input data={{ value: d.pandingRequ }} />
                </td>

                <td
                  onClick={() => {
                    if (data.isIndex === i) {
                      data.detailsHandler(!data.isDetails);
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      navigate(`/module/edit/${d?._id}`);
                    }}
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
