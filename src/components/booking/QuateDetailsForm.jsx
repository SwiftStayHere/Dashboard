import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { FaPercentage } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import PopupTitle from "../basic/PopupTitle";
import Select from "../basic/Select";
import CopyLink from "./CopyLink";
import HotelSuggest from "./HotelSuggest";
import Input from "./Input";
import SendBtn from "./SendBtn";
import SendMessage from "./SendMessage";
import Tags from "./Tags";
import TimeSlot from "./TimeSlot";
import values from "../../../values";
import axios from "axios";

export default function QuoteDetailsForm({
  isDetails,
  handler,
  isIndex,
  isUser,
}) {
  const date = new Date();
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);

  const [formInfo, setFormInfo] = useState([
    {
      label: "Nome",
      value: "",
    },
    {
      label: "Cognome",
      value: "",
    },
    {
      label: "email",
      value: "",
    },
    {
      label: "Numero di Telefono",
      value: "",
      country: true,
    },
  ]);

  const setVal = (value, i) => {
    let values = [...formInfo];
    values[i].value = value;
    setFormInfo(values);
  };
  const [hotels, setHotels] = useState([]);
  async function renderHotels() {
    await axios
      .get(`${values.url}/app/hotels`)
      .then(async (response) => {
        setHotels(response.data.map((d) => d.name).sort());
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    renderHotels();
  }, [])
  const [options, setOptions] = useState([
    {
      name: "Trasporto Option 1",
      op: ["Bus + Bus", "Bus", "Trin"],
    },
    {
      name: "Fare",
      value: "$0",
    },
    {
      name: "Trasporto Option 2",
      op: ["Bus + Bus", "Bus", "Trin"],
    },
    {
      name: "Fare",
      value: "$10",
    },
  ]);

  const setData = (value, i) => {
    let values = [...options];
    values[i].value = value;
    setOptions(values);
  };

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

  const final = useRef(null);
  const [inputCity, setInputCity] = useState('');
  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    const bookingData = {
      "fName": String(formInfo[0].value),
      "lName": String(formInfo[1].value),
      "email": String(formInfo[2].value),
      "phone": String(formInfo[3].value),
      "lastQuoteSent": date,
      "quoteSent": 404,
      "tag": ["partner", "development"]
    };

    const renderPostUserData = () => {
      // Connect with the database and send the data
      axios
        .post(`${values.url}/booking`, userData)
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          // Assume the status should be updated to "Preventivo Inviato" after successful submission
          setStatus("Preventivo Inviato");
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    };

    renderPostUserData();
  };


  const [td, setTD] = useState([]);

  async function renderbookingData() {
    axios.get(`${values.url}/booking`)
      .then(response => {
        setTD(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  useEffect(() => {
    renderbookingData();
  }, [])

  const newid = Number(td[td?.length - 1]?.id) + 1;


  return (
    <div className={`details ${(isDetails && "show") || ""}`}>
      <div className="details-wrp">
        <div className="details-head">
          <div className="details-head-top">
            <div className="details-head-top-left">
              <button onClick={() => handler(false)}>
                <FaCircleChevronRight />
              </button>
              <h4>ID #{newid}</h4>
              <span className={`quote  ${getStatusColor(status)}`}>
                <span className="status-icon">{getStatusIcon(status)}</span>
                <span className="status-text">{status}</span>
              </span>
            </div>
            <div className="details-head-top-left">
              <button
                onClick={() => {
                  handler(false);
                }}
              >
                <GrClose />
              </button>
            </div>
          </div>
          <div className="details-head-bottom">
            <p>
              {" "}
              Request Date : <span>{moment(date).locale('it').format("MMM DD, YY")} </span>
              {moment(date).locale('it').format("hh:mm a")}
            </p>
          </div>
        </div>

        <CopyLink />

        <div className="details-body">
          <form onSubmit={(e) => e.preventDefault()} className="form" action="">
            <div className="title-btn">
              <PopupTitle title="Dettagli Utente" />
            </div>
            <div className="form-body">
              {formInfo.map((item, i) => (
                <div key={i} className="form-group">
                  {(item.country && (
                    <>
                      <label htmlFor={i}>{item.label}</label>{" "}
                      <div className="form-group-wrp">
                        <Input data={{ value: item.value, i, setVal }} />
                      </div>
                    </>
                  )) || (
                      <>
                        {" "}
                        <label htmlFor={i}>{item.label}</label>
                        <Input data={{ value: item.value, isIndex, i, setVal }} />
                      </>
                    )}
                </div>
              ))}
            </div>
          </form>
          <SendMessage data={{ text: "" }} />

          <Tags />
        </div>

        <div className="details-body">
          <PopupTitle title="Trip Details" />
          <form onSubmit={(e) => e.preventDefault()} className="form">
            <div className="form-body">
              <div className="form-group">
                <label htmlFor="cirra">Citta</label>
                <input type="text" value={inputCity} onChange={handleCityChange} />
              </div>
              <div className="form-group">
                <label htmlFor="Periodo">Periodo Soggiorno</label>
                <Input
                  data={{
                    value: "",
                    i: 12, setData
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        {inputCity &&
          <div className="details-body ">
            <div className="option">
              <div className="option-left">
                {options.map((d, i) => (
                  <div key={i} className="option-left-item">
                    <span>{d.name}</span>
                    {(d.op && <Select data={d.op} />) ||
                      (d.value && <Input data={{ value: d.value, i }} />)}
                  </div>
                ))}
              </div>
              <div className="option-right">
                <TimeSlot
                  data={{
                    name: "1",
                    times: [
                      "7:00 PM",
                      "7:30 PM",
                      "8:00 PM",
                      "9:00 PM",
                      "9:00 PM",
                      "9:00 PM",
                      "9:00 PM",
                    ],
                  }}
                />
                <TimeSlot
                  data={{
                    name: "2",
                    times: ["6:00 PM", "6:30 PM", "7:00 PM", "9:00 PM"],
                  }}
                />
              </div>
            </div>

            <div className="add-option">
              <button>
                <span>
                  <AiOutlinePlus />
                </span>{" "}
                Add More Trasporto Option{" "}
              </button>
              <p>
                Questa è la lista di tutti i preventivi richiesti dai vari portali
              </p>
            </div>
          </div>
        }

        <div className="details-hotel">
          <PopupTitle title="Hotel Selezionato" />
          <div
            onClick={(e) => {
              if (final.current && !final.current.contains(e.target))
                setIsSuggest(!isSuggest);
            }}
            className={`details-hotel-body ${(isSuggest && "hide") || ""}`}
          >
            <div className="details-hotel-body-top">
              <div className="left">
                <div className="icon">
                  <HiLocationMarker />
                </div>
                <div className="info">
                  <h4>
                    San Pierro di Positano <span>Suite</span>{" "}
                  </h4>
                  <p>3 Rooms, 2 bathroom, 1 swimming pool</p>
                </div>
              </div>
              <div className="right">
                <label htmlFor="price">Preventivo Finale</label>
                <div className="right-input">
                  <Select data={["$", "€"]} />
                  <input
                    ref={final}
                    id="peice"
                    type="number"
                    value={"1600"}
                    onChange={() => { }}
                  />
                </div>
              </div>
            </div>
            <div className="details-hotel-body-bottom">
              <p>
                <div className="icon">
                  <FaPercentage />
                </div>
                10% Sconto Applicato
              </p>

              <button onClick={() => { }}>
                <BiDotsVerticalRounded />
              </button>
            </div>
          </div>
        </div>
        <HotelSuggest isSuggest={isSuggest} setIsSuggest={setIsSuggest} />
        <div className="details-footer">
          <div className="details-footer-item"></div>{" "}
          <div className="details-footer-item">
            <button onClick={handleSubmit}>
              <SendBtn data={{ send: "Send add", sent: "Quote added" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
