import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Input from "../booking/Input";

export default function ModuleDetailsTable({ data }) {
  const [td, setTD] = useState([
    {
      id: 2036,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: null,
      added: "",
    },
    {
      id: 2037,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: null,
      added: "",
    },
    {
      id: 2038,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2039,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2040,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2041,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2042,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2043,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
  ]);

  const [th, setTh] = useState([
    "Dettagli Utenti",
    "Date",
    "Città",
    "Trasporto",
    "Tipi di Camera",
    "Periodo Soggiorno",
  ]);

  const [isFocus, setIsFocus] = useState(false);

  const inp = useRef(td.map(() => createRef()));
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (index || index === 0) {
      inp.current[index].current.childNodes[1].focus();
    }
  }, [index]);

  const [isDel, setIsDel] = useState(false);
  const del = useRef(null);
  const tbd = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (del.current && !del.current.contains(e.target)) {
        setIsDel(false);
      }
    });
  }, []);

  return (
    <table className="table module-details-table" id="table">
      <thead>
        <tr className="th">
          <th>ID</th>
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
        </tr>
      </thead>

      <tbody ref={tbd}>
        <div ref={del} className={`buttons ${(isDel && "show") || ""}`}>
          <button>Delete</button>
        </div>
        {td.map((d, i) => (
          <tr
            onClick={(e) => {
              e.target.blur();
            }}
            key={i}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td className="id">
              <Input data={{ value: d.id }} />
            </td>
            <td className="name">
              <div className="inner">
                <strong>
                  <Input data={{ value: d.user }} />
                </strong>{" "}
                <span>{d.quote} quote request</span>
              </div>
            </td>
            <td>
              <div className="inner">
                <strong>{moment(d.date).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.date).format("h: MM a")}</span>
              </div>
            </td>

            <td>
              {" "}
              <Input data={{ value: d.citta }} />
            </td>
            <td>
              <Input data={{ value: d.trasporto }} />
            </td>
            <td className="tipi">
              <Input data={{ value: d.tipi }} />
            </td>
            <td>
              <div className="inner">
                <strong className="periodo">
                  <Input data={{ value: d.periodo }} />
                </strong>
                <span>{d.dateLine}</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
