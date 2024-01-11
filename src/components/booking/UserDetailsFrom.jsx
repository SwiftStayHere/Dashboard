import moment from "moment";
import { useState, useEffect } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import PopupTitle from "../basic/PopupTitle";
import Select from "../basic/Select";
import Input from "./Input";
import SendBtn from "./SendBtn";
import values from "../../../values";
import Tags from "./Tags";
import axios from "axios";
import { Navigate, Route } from "react-router-dom";
import TableUser from "./TableUser";

function UserDetailsFrom({
  isDetails,
  handler,
  quate,
  updateUserData,
  setGetuser,
}) {
  const date = new Date();
  const [isIndex, setIsIndex] = useState(null);
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [newID, setNewID] = useState(0)
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

  const handleSubmit = async (event) => {
    let userData = {};
    console.log("run");
    const allRequiredFieldsFilled = formInfo.every(
      (field) => field.value.trim() !== ""
    );
    if (!allRequiredFieldsFilled) {
      console.error("fill every thing");
      handler(false);
      console.log(allRequiredFieldsFilled);
      return;
    }
    // const existingUser = td.find((user) => user.phone === formInfo[3].value);
    // if (existingUser) {
    //   // Connect the booking details to the existing user
    //   // You might want to update this logic based on your data structure
    //   // For example, you may want to add the booking details to an array in the user object
    //   existingUser.bookingDetails = {
    //     // Add booking details here
    //   };

    //   // Update the user data in the database
    //   // You'll need to implement this part based on your backend logic
    //   // Example: axios.put(`${values.url}/booking/user/${existingUser.id}`, existingUser);
    // } else {
    //   const userData = {
    //     fName: String(formInfo[0].value),
    //     lName: String(formInfo[1].value),
    //     email: String(formInfo[2].value),
    //     phone: String(formInfo[3].value),
    //     lastQuoteSent: date,
    //     quoteSent: 404,
    //     tag: ["partner", "development"],
    //   };
    // }

    const renderPostUserData = async () => {
      // Connect with the database and send the data
      try {
        const newUser = await axios.post(
          `${values.url}/booking/user`,
          {
            fName: String(formInfo[0].value),
            lName: String(formInfo[1].value),
            email: String(formInfo[2].value),
            phone: String(formInfo[3].value),
            tags: tags,
            lastQuoteSent: new Date(),
            quoteSent: 404,
          }
        );

        setGetuser((prev) => !prev);
        handler(false);
        setFormInfo([
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
      } catch (newUserError) {
        axios
          .post(
            `${values.url}/booking/user`,
            {

              fName: String(formInfo[0].value),
              lName: String(formInfo[1].value),
              email: String(formInfo[2].value),
              phone: String(formInfo[3].value),
              lastQuoteSent: new Date(),
              tags: tags,
              quoteSent: 404,
            }
          )
          .then(() => {

            setGetuser((prev) => !prev);
            handler(false);
            setFormInfo([
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
          })
          .catch((err) => {
            console.log(err);
          });

        // console.error("Error creating new user:", newUserError);

      }

    }
    renderPostUserData();
  };

  const [td, setTD] = useState([]);

  async function renderGetUserData() {
    axios
      .get(`${values.url}/booking/user`)
      .then((response) => {
        setTD(response.data);
        setNewID(response.data.length + 1)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    renderGetUserData();
  }, []);

  // useEffect(()=>{
  //   console.log()
  //   setNewID(()=> Number(td[td?.length - 1]?.id) + 1)
  // },[])

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

  return (
    <div className={`details user-details ${(isDetails && "show") || ""}`}>
      <div className="details-wrp">
        <div className="details-head">
          <div className="details-head-top">
            <div className="details-head-top-left">
              <button onClick={() => handler(false)}>
                <FaCircleChevronRight />
              </button>
              <h4>ID #{newID}</h4>
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
              <span>{moment(date).locale("it").format("MMM DD, YY")} </span>
              {moment(date).locale("it").format("hh:mm a")}
            </p>
          </div>
        </div>

        <div className="details-body">
          <form>
            <PopupTitle title="Dettagli Utenti" />
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
          <Tags setUserTags={setTags} />
        </div>

        <div className="details-bottom">
          <button onClick={handleSubmit}>
            <SendBtn
              data={{ send: "add user", sent: "user Added" }}
              clickfunction={handleSubmit}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserDetailsFrom
