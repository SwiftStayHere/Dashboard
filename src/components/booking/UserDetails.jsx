import moment from "moment";
import { useState, useEffect } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import values from "../../../values";
import PopupTitle from "../basic/PopupTitle";
import Select from "../basic/Select";
import Input from "./Input";
import axios from "axios";
import Pagenation from "./Pagenation";
import QuoteDetails from "./QuoteDetails";
import Table from "./Table";
import Tags from "./Tags";
import { transform } from "framer-motion";


export default function UserDetails({
  isDetails,
  handler,
  user,
  isIndex,
  setIsIndex,
  setCurrentUser,
  currentUser,
}) {
  const filterUserById = (userData, targetId) => {
    return userData.filter((user) => user._id === targetId);
  };
  function formatDateItalian(dateString) {
    const options = {
      year: "numeric",
      month: "short", // Short month name in Italian
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
      timeZone: "UTC", // Assuming the input date is in UTC
    };

    const formattedDate = new Date(dateString).toLocaleString("it-IT", options);
    return formattedDate;
  }
  const date = new Date();
  // const [isIndex, setIsIndex] = useState(null);
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [tempData, setTempData] = useState([])
  const [formdata, setFormData] = useState([]);
  const [userD, setUserData] = useState(null);
  useEffect(() => {
    async function renderGetUserData() {
      try {
        const response = await axios.get(`${values.url}/booking/user`);

        let userData = filterUserById(response.data, currentUser);
        await axios.get(`${values.url}/booking`).then((response) => {
          // console.log("Table Data",response.data)
          let list = response.data;
          list = list.filter((item) => item.userId == currentUser)
          console.log(list)
          setTempData(list)
        });
        userData = userData[0];
        console.log(userData)
        setUserData(userData);
        // console.log(userData)
        setFormData([
          {
            label: "Nome",
            value: userData?.fName,
          },
          {
            label: "Cognome",
            value: userData?.lName,
          },
          {
            label: "email",
            value: userData?.email,
          },
          {
            label: "Numero di Telefono",
            value: userData?.phone,
            country: true,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


    renderGetUserData();
  }, [isIndex]);

  const displaydata = [
    {
      label: "Nome",
      value: formdata.fName,
    },
    {
      label: "Cognome",
      value: formdata.lName,
    },
    {
      label: "email",
      value: formdata.email,
    },
    {
      label: "Numero di Telefono",
      value: formdata.phone,
      country: true,
    },
  ];
  const [formInfo, setFormInfo] = useState([]);

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

  const [isQuate, setIsQuate] = useState(false);

  return (
    <div className={`details user-details ${(isDetails && "show") || ""}`}>
      <div className="details-wrp">
        <div className="details-head">
          <div className="details-head-top">
            <div className="details-head-top-left">
              <button onClick={() => handler(false)}>
                <FaCircleChevronRight />
              </button>
              <h4>ID #{userD?.id ? userD.id : 1}</h4>
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
              Request Date :{" "}
              <span>{formatDateItalian(userD?.lastQuoteSent)} </span>
            </p>
          </div>
        </div>

        <div className="details-body">
          <form onSubmit={(e) => e.preventDefault()} className="form" action="">
            <PopupTitle title="Dettagli Utenti" />
            <div className="form-body">
              {formdata?.map((item, i) => (
                <div key={i} className="form-group">
                  {/* {console.log(item)} */}
                  {(item.country && (
                    <>
                      <label htmlFor={i}>{item.label}</label>{" "}
                      <div className="form-group-wrp">
                        <Input data={{ value: item.value, i }} />
                      </div>
                    </>
                  )) || (
                      <>
                        {" "}
                        <label htmlFor={i}>{item.label}</label>
                        <Input data={{ value: item.value, i }} />
                      </>
                    )}
                </div>
              ))}
            </div>
          </form>

          <Tags userId={userD?._id} />
        </div>

        <div className="details-bottom">
          <PopupTitle title={`Preventivi Richiesti (${tempData.length})`} />
          <div className="details-bottom-table">
            <>
              {" "}
              <Table
                data={{
                  th: values.requestTH,
                  detailsHandler: setIsQuate,
                  isIndex: isIndex,
                  setIsIndex,
                  isQuate,
                }}
                tableData={tempData}
                setCurrentUser={setCurrentUser}
              />
            </>
          </div>
          <Pagenation />
        </div>
      </div>

      <QuoteDetails
        isDetails={isQuate}
        isIndex={isIndex}
        handler={setIsQuate}
        isUser={false}
        currentUserId={currentUser}
        setCurrentUserId={setCurrentUser}
      />
    </div>
  );
}
