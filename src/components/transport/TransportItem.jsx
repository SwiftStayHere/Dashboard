import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import {
  BiEdit,
  BiSolidDollarCircle,
  BiSolidLocationPlus,
} from "react-icons/bi";
import { FaCarSide, FaShip } from "react-icons/fa";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { TbTrain } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function TransportItem({
  handler,
  data,
  setTransportData,
  setIsDup,
}) {
  const [prics, setPrics] = useState([]);

  useEffect(() => {
    moment.locale("it"); // Set the locale
  }, []);

  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    localeMatcher: "best fit",
  };

  const nameOrder = {
    Adulti: 1,
    Bambini: 2,
    Bagagli: 3,
    Animale: 4,
  };

  const [isDetails, setIsDetails] = useState(false);
  const formattedDate = (value) =>
    new Intl.DateTimeFormat("en-EN", options).format(value);

  useEffect(() => {
    setPrics(data?.pricing.sort((a, b) => a?.age - b?.age));
  }, [data]);

  const customSort = (a, b) => {
    const order = [
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
      "Domenica",
    ];

    return order.indexOf(a) - order.indexOf(b);
  };

  //. kits

  const [kits, setKits] = useState([]);

  useEffect(() => {
    setKits(
      prics.sort((a, b) => a?.age - b?.age).filter((i) => i.name === "Bambini")
    );
  }, [prics]);

  const kidsHandler = (age) => {
    let config = ` 0-${kits[0]?.age} `;
    for (let i = 0; i < kits.length; i++) {
      if (i > 0) {
        if (age === kits[i]?.age) {
          config = ` ${kits[i - 1]?.age}-${kits[i]?.age} `;
        }
      }
    }

    return config;
  };

  // config = ` ${kits[0]?.age + 1}-${kits[i]?.age} `;
  const [isDelete, setIsDelete] = useState(false);
  const duplicateHandler = () => {};

  return (
    <div className="item">
      <div className="item-top-wrp">
        <div className={`item-top ${isDetails && "bg-grey"}`}>
          <div className="content">
            <strong>{data?.name}</strong>
            <span>
              {data?.date[0]?.start &&
                formattedDate(new Date(data?.date[0]?.start))}
              {" -" + " "}
              {data?.date[data?.date?.length - 1]?.end &&
                formattedDate(
                  new Date(data?.date[data?.date?.length - 1]?.end)
                )}
            </span>
          </div>

          <div className="right">
            {isDetails && (
              <Link
                onClick={() => {
                  setIsDetails(false);
                  setIsDup(false);
                }}
                to=""
              >
                Close Details
              </Link>
            )}

            {isDetails && (
              <Link
                onClick={() => {
                  handler(true);
                  setTransportData(data);
                  setIsDup(true);
                }}
                to=""
              >
                Duplicate
              </Link>
            )}

            <Link
              onClick={() => {
                if (!isDetails) {
                  setIsDetails(true);
                  setIsDup(false);
                } else {
                  handler(true);
                  setTransportData(data);
                  setIsDup(false);
                }
              }}
              to=""
            >
              {isDetails && <BiEdit />}{" "}
              {(!isDetails && "See Details") || "Edit Transport"}
            </Link>
          </div>
        </div>
        {!isDetails && (
          <div className="item-bottom">
            <span>
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
              {data?.vehicleType === "Aereo" && "Airplane"}
              {data?.vehicleType === "Treno" && "Train"}
              {data?.vehicleType === "Bus" && "Bus"}
              {data?.vehicleType === "Nave" && "Ship"}
            </span>
            <span>
              <BiSolidLocationPlus /> {data?.state && data?.state + ","}{" "}
              {data?.city && data?.city + "."} {data?.zip}
            </span>
          </div>
        )}
      </div>
      <div className={`item-body ${isDetails && "show"}`}>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              <BiSolidLocationPlus />
            </div>
            <div className="content">
              <span>Start Point</span>
              <strong>
                {data?.state && data?.state + ","}{" "}
                {data?.city && data?.city + "."} {data?.zip}
              </strong>
            </div>
          </div>
        </div>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
            </div>
            <div className="content">
              <span>Vehicle Type</span>
              <strong>{data?.vehicleType === "Aereo" && "Airplane"}
              {data?.vehicleType === "Treno" && "Train"}
              {data?.vehicleType === "Bus" && "Bus"}
              {data?.vehicleType === "Nave" && "Ship"}</strong>
            </div>
          </div>
          <div className="item-body-item-inner">
            <div className="icon">
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
            </div>
            <div className="content">
              <span>Brand Name</span>
              <strong>{data?.vehicleBrand}</strong>
            </div>
          </div>
        </div>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              <SlCalender />
            </div>
            <div className="content">
              <span>Validity Period</span>
              <strong>
                {data?.date[0]?.start &&
                  formattedDate(new Date(data?.date[0]?.start))}
                {" -" + " "}
                {data?.date[data?.date?.length - 1]?.end &&
                  formattedDate(
                    new Date(data?.date[data?.date?.length - 1]?.end)
                  )}
              </strong>
            </div>
          </div>
          <div className="item-body-item-inner">
            <div className="icon">
              <SlCalender />
            </div>
            <div className="content">
              <span>Valid Days</span>
              <div className="days">
                {data?.days.sort(customSort).map((d, i) => (
                  <strong key={i}>
                    {"  " + d}
                    {(i === data.days.length - 2 && " e") ||
                      (i === data.days.length - 1 && " ") ||
                      ","}
                  </strong>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="item-body-item catagory">
          <div className="item-body-item-inner">
            <div className="icon">
              <BiSolidDollarCircle />
            </div>
            <div className="content">
              <span>Price per Category</span>
            </div>
          </div>
          <div className="item-body-item-pricing">
            {prics
              ?.sort((a, b) => nameOrder[a.name] - nameOrder[b.name])
              .map((d, i) => (
                <div
                  className={`item ${
                    (d?.name === "Adulti" && "disc") ||
                    (d?.name === "Bambini" && "bam") ||
                    (d?.name === "Animale" && "ani")
                  }`}
                  key={i}
                >
                  <strong>
                    {d?.name === "Adulti" && "Adults"}
                    {d?.name === "Bambini" && "Children"}
                    {d?.name === "Bagagli" && "Luggage"}
                    {d?.name === "Animale" && "Animals"}
                    {(d?.name === "Bambini" && (
                      <span>
                        {" "}
                        (Age
                        {d && kidsHandler(d?.age)})
                      </span>
                    )) ||
                      ((d?.name === "Bagagli" || d?.name === "Animale") &&
                        d?.maxWeight && (
                          <span>
                            {" "}
                            (Maximum Weight {d?.maxWeight}
                            {d?.unit})
                          </span>
                        )) ||
                      ""}
                  </strong>
                  <h4>
                    {d?.carency}
                    {d?.cost}
                  </h4>

                  {((d?.name === "Adulti" || d?.name === "Bambini") && (
                    <span className={d?.discount && "dis"}>
                      {d?.discount}% Discount
                    </span>
                  )) ||
                    (d?.name === "Bagagli" && (
                      <span>Number of Baggage {d?.count}</span>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
