import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlinePlus,
  AiOutlineQuestion,
} from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import values from "../../../values";
import Input from "./Input";
import axios from "axios";

export default function Table({
  data,
  tableData,
  setCurrentUser,
  currentUser,
}) {
  // const [bookingData, setBookingData] = useState("");
  const [td, setTD] = useState([]);
  const [quoteList, setQuoteList] = useState({});

  async function renderbookingData() {
    await axios
      .get(`${values.url}/booking`)
      .then((response) => {
        setTD(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  function transformSentence(sentence) {
    // Split the original sentence into parts
    const parts = sentence.split(" ");

    // Add the comma and euro sign to the appropriate parts
    parts[1] = `${parts[1]},`;
    parts[3] = `${parts[3]} € `;

    // Join the modified parts back into a string
    const transformedSentence = parts.join(" ");

    return transformedSentence;
  }
  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const options = {
      year: "2-digit",
      month: "short",
      day: "numeric",
      timeZone: "UTC", // Set to Italian time zone
    };

    const formattedDate = new Intl.DateTimeFormat("en-EN", options).format(
      dateObject
    );

    // Capitalize the first letter of the month
    const capitalizedMonth = formattedDate.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );

    return capitalizedMonth;
  }
  useEffect(() => {
    let tempQuote = {}
    for (let i = 0; tableData?.length > i; i++) {
      let item = tableData[i];
      if (tempQuote[item.userId] == undefined) {
        tempQuote[item.userId] = 1;
      } else {
        tempQuote[item.userId] += 1;
      }
    }
    setQuoteList(tempQuote);
    setTD(tableData);

    // renderbookingData();
  }, [tableData]);

  const [isFocus, setIsFocus] = useState(false);

  // const inp = useRef(td.map(() => createRef()));
  const [index, setIndex] = useState(null);

  const [status, setStatus] = useState("To be Processed");
  function formatGuestsText(inputSentence) {
    // Extracting numbers using a regular expression
    const match = inputSentence.match(/\d+/g);

    if (match) {
      const adults = parseInt(match[0], 10) || 0;
      const children = parseInt(match[1], 10) || 0;

      const adultText = adults === 1 ? "Adult" : "Adults";
      const childrenText = children === 1 ? "Child" : "Children";

      return `${adults} ${adultText}, ${children} ${childrenText}`;
    }

    // Return a default value or handle the case when numbers are not found
    return "Invalid input";
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Preventivo Inviato":
        return "green";
      case "Da inviare":
        return "blue";
      case "To be Processed":
        return "yellow";
      case "Non Inviato":
        return "red";
      case "CTA Cliccata":
        return "black";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Preventivo Inviato":
        return "✅";
      case "Da inviare":
        return "!";
      case "To be Processed":
        return "?";
      case "Non Inviato":
        return "x";
      case "CTA Cliccata":
        return "👆";
      default:
        return "";
    }
  };
  function extractTimeFromISOString(dateString) {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

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
    if (index || index === 0) {
      inp.current[index].current.childNodes[1].focus();
    }
  }, [index]);

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

  return (
    tableData && (
      <table className="table" id="table">
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
          <div ref={del} className={`buttons ${(isDel && "show") || ""}`}>
            <button>Delete</button>
          </div>

          {tableData?.map((d, i) => (
            <tr
              key={i}
              onClick={() => {
                console.log("Calling setIsIndex");
                data.setIsIndex(d.id - 1);

                window.isIndex = d.id - 1;
                setCurrentUser((prev) => {
                  // console.log(currentUser, d.userId);
                  return d.userId;
                });
                data.detailsHandler(true);
              }}
              className={`${(data.isIndex === d.id - 1 && "active") || ""}`}
            >
              {/* {console.log(tableData)} */}
              <td
                onContextMenu={(e) => contexHandler(e, d.select, d.id - 1)}
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
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
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
                <div className="inner">
                  <strong>
                    <Input data={{ value: d.user }} disabled={true} />
                  </strong>{" "}
                  <span
                    onClick={() => {
                      data.detailsHandler(!data.isDetails);
                    }}
                  >
                    {quoteList[d.userId]} request{quoteList[d.userId] == 1 ? 'a' : "e"} for quote
                  </span>
                </div>
              </td>
              <td
                onClick={() => {
                  if (data.isIndex === d.id - 1) {
                    data.detailsHandler(!data.isDetails);
                  } else {
                    data.setIsIndex(d.id - 1);
                    setCurrentUser(d.userId);
                    window.isIndex = d.id - 1;
                    data.detailsHandler(true);
                  }
                }}
              >
                <div
                  onClick={() => {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                    }
                  }}
                  className="inner"
                >
                  <strong>{formatDate(d.date)}</strong>{" "}
                  <span>{extractTimeFromISOString(d.date)}</span>
                </div>
              </td>
              <td
                onClick={(e) => {
                  if (!isFocus || !(isFocus === "module")) {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
                        data.detailsHandler(true);
                        e.target.blur();
                      }
                    } else {
                      data.detailsHandler(false);
                    }
                  }
                }}
                onDoubleClick={(e) => {
                  setIsFocus("module");
                  data.detailsHandler(false);
                }}
              >
                {" "}
                <Input data={{ value: "SwiftStay" }} />
              </td>
              <td
                onClick={(e) => {
                  if (!isFocus || !(isFocus === "citta")) {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
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
                <Input data={{ value: d.citta }} />
              </td>
              <td
                onClick={(e) => {
                  if (!isFocus || !(isFocus === "trastorto")) {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
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
                <Input data={{ value: d.trasporto }} />
              </td>
              <td
                onClick={(e) => {
                  if (!isFocus || !(isFocus === "tipi")) {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
                        data.detailsHandler(true);
                        e.target.blur();
                      }
                    } else {
                      data.detailsHandler(false);
                    }
                  }
                }}
                onDoubleClick={(e) => {
                  setIsFocus("tipi");
                  data.detailsHandler(false);
                }}
                className="tipi"
              >
                <Input data={{ value: formatGuestsText(d.tipi) }} />
              </td>
              <td
                onClick={(e) => {
                  if (!isFocus || !(isFocus === "periodo")) {
                    if (data.isIndex === d.id - 1) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(d.id - 1);
                      setCurrentUser(d.userId);
                      window.isIndex = d.id - 1;
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    if (e.target.tagName !== "INPUT") {
                      if (data.isIndex === d.id - 1) {
                        // console.log(data.isIndex);
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
                        data.detailsHandler(true);
                        e.target.blur();
                      }
                    } else {
                      data.detailsHandler(false);
                    }
                  }
                }}
                onDoubleClick={(e) => {
                  setIsFocus("periodo");
                  data.detailsHandler(false);
                }}
              >
                <div className="inner">
                  <strong className="periodo">
                    <Input data={{ value: d.periodo }} />
                  </strong>
                  <span
                    onClick={() => {
                      if (data.isIndex === d.id - 1) {
                        data.detailsHandler(!data.isDetails);
                      } else {
                        data.setIsIndex(d.id - 1);
                        setCurrentUser(d.userId);
                        window.isIndex = d.id - 1;
                        data.detailsHandler(true);
                      }
                    }}
                  >
                    {d.dateLine}
                  </span>
                </div>
              </td>
              <td className="price">
                {(d.price && (
                  <div
                    onClick={(e) => {
                      if (!isFocus || !(isFocus === "price")) {
                        data.detailsHandler(!data.isDetails);
                        e.target.blur();
                      } else {
                        data.detailsHandler(false);
                      }
                    }}
                    onDoubleClick={(e) => {
                      setIsFocus("price");
                    }}
                    className="inner"
                  >
                    <strong ref={inp.current[i]}>
                      €<Input data={{ value: d.price }} />
                    </strong>
                    <span
                      onClick={() => {
                        if (data.isIndex === d.id - 1) {
                          data.detailsHandler(!data.isDetails);
                        } else {
                          data.setIsIndex(d.id - 1);
                          setCurrentUser(d.userId);
                          window.isIndex = d.id - 1;
                          data.detailsHandler(true);
                        }
                      }}
                    >
                      {" "}
                      By {d.added}
                    </span>
                  </div>
                )) || (
                    <div className="add_price">
                      <button onClick={() => addPriceHandler(d.id - 1, " ", i)}>
                        <AiOutlinePlus /> <span>Add Price</span>
                      </button>
                    </div>
                  )}
              </td>
              <td
                onClick={() => {
                  if (data.isIndex === d.id - 1) {
                    data.detailsHandler(!data.isDetails);
                  } else {
                    data.setIsIndex(d.id - 1);
                    setCurrentUser(d.userId);
                    window.isIndex = d.id - 1;
                    data.detailsHandler(true);
                  }
                }}
                onDoubleClick={(e) => {
                  setIsFocus("price");
                  data.detailsHandler(false);
                }}
              >
                {(!d.price && (
                  <div className="waiting">
                    <span className={`quote  ${getStatusColor(status)}`}>
                      <span className="status-icon">
                        {getStatusIcon(status)}
                      </span>
                      <span className="status-text">{status}</span>
                    </span>
                  </div>
                )) || (
                    <div className="complate">
                      <span className={`quote  ${getStatusColor(status)}`}>
                        <span className="status-icon">
                          {getStatusIcon("Preventivo Inviato")}
                        </span>
                        {/* user the status according to what you get from backend*/}
                        <span className="status-text">Preventivo Inviato</span>
                      </span>
                    </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}
