import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlinePlus,
  AiOutlineQuestion,
} from "react-icons/ai";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Input from "./Input";
import values from "../../../values";

export default function TableUserDetails({ data }) {
  const bookingdetails = values.bookingData;
  const [td, setTD] = useState(bookingdetails);

  const [isFocus, setIsFocus] = useState(false);

  const inp = useRef(td.map(() => createRef()));
  const [index, setIndex] = useState(null);

  const [status, setStatus] = useState("To be Processed");

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
  return (
    <table className="table" id="table">
      <thead>
        <tr className="th">
          <th>#</th>
          {data?.th.map((d) => (
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
        </tr>
      </thead>

      <tbody>
        {td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              data.setIsIndex(i);
            }}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
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
              {(i < 9 && "0" + (i + 1)) || i + 1}
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
              <div className="inner">
                <strong>
                  <Input data={{ value: d.user }} />
                </strong>{" "}
                <span
                  onClick={() => {
                    data.detailsHandler(!data.isDetails);
                  }}
                >
                  {d.quote} quote request
                </span>
              </div>
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
                <strong>{moment(d.date).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.date).format("h: MM a")}</span>
              </div>
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "module")) {
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
                setIsFocus("module");
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.module }} />
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
              <Input data={{ value: d.citta }} />
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
              <Input data={{ value: d.trasporto }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "tipi")) {
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
                setIsFocus("tipi");
                data.detailsHandler(false);
              }}
              className="tipi"
            >
              <Input data={{ value: d.tipi }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "periodo")) {
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
                    if (data.isIndex === i) {
                      data.detailsHandler(!data.isDetails);
                    } else {
                      data.setIsIndex(i);
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
                      if (data.isIndex === i) {
                        data.detailsHandler(!data.isDetails);
                      } else {
                        data.setIsIndex(i);
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
                    <button onClick={() => addPriceHandler(d.id, " ", i)}>
                      <AiOutlinePlus /> <span>Add Price</span>
                    </button>
                  </div>
                )}
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
              onDoubleClick={(e) => {
                setIsFocus("price");
                data.detailsHandler(false);
              }}
            >
              {(!d.price && (
                <div className="waiting">
                  <span className={`quote  ${getStatusColor(status)}`}>
                    <span className="status-icon">{getStatusIcon(status)}</span>
                    <span className="status-text">{status}</span>
                  </span>
                </div>
              )) || (
                  <div className="complate">
                    <span>
                      <AiFillCheckCircle />
                    </span>{" "}
                    <span> Quote Complate </span>
                  </div>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
