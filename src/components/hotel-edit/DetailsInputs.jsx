import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import values from "../../../values";
import Select from "../basic/Select";
import EditTitle from "./EditTItle";
import Input from "./Input";

export default function DetailsInputs({ data, setData, fixtData }) {
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();
  const [isSpa, setIsSpa] = useState(false);
  // const [isRestu, setIsRestu] = useState(Boolean(data?.restaurantDescription));
  const [isRestu, setIsRestu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${values.url}/hotel/single/${id}`);
        const { data } = response;
        setIsSpa(Boolean(data?.spaDescription));
        setIsRestu(Boolean(data?.restaurantDescription));

        const inputsData = [
          { label: "Hotel Name", value: data?.name },
          { label: "Hotel ID", value: data?.id },
          { label: "Morgana ID", value: data?.morganaId },
          { label: "Hotel Website", value: data?.hotelWebsite, url: true },
          { label: "Email", value: data?.email },
          { label: "Telephone Number", value: data?.phone, number: true },
          { label: "Hotel XML url", value: data?.hotelXMLurl, url: true },
          { label: "Priority", value: data?.priority },
        ];

        setInputs(inputsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        name: inputs[0]?.value,
        morganaId: inputs[2]?.value,
        hotelWebsite: inputs[3]?.value,
        email: inputs[4]?.value,
        phone: inputs[5]?.value,
        hotelXMLurl: inputs[6]?.value,
        priority: inputs[7]?.value,
      };
    });
  }, [inputs]);

  const changeHandler = (label, newValue) => {
    if (label === "Priorità") {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: parseInt(newValue) } : input
      );
      setInputs(updatedInputs);
    } else if (label === "Hotel ID") {
      setInputs(inputs);
    } else {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: newValue } : input
      );
      setInputs(updatedInputs);
    }
  };

  const [roomsTitle, setRoomsTitle] = useState(
    data?.roomsTitle || "Descrizione Camere"
  );
  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        roomsTitle,
      };
    });
  }, [roomsTitle]);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [intigator, setInitgator] = useState("");

  useEffect(() => {
    setRoomsTitle(fixtData?.roomsTitle || "Rooms Description");
  }, [fixtData]);

  return (
    <>
      <div className="hotel-form-details-wrp">
        {inputs.map((d, i) => (
          <div key={i} className="hotel-form-details-item">
            <label htmlFor={i}>{d.label}</label>
            <div className="inner">
              {d.number && <Select data={["🇱🇷", "🇧🇩", "🇸🇳"]} />}
              <Input handler={(e) => changeHandler(d.label, e)} d={d} i={i} />
              {d.url && (
                <a href={d.value} target="blank">
                  <PiArrowSquareOutBold />
                </a>
              )}
            </div>
          </div>
        ))}
        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">Hotel Description</label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder="Enter the hotel Description"
              value={data?.hotelDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    hotelDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}
        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">Summary Description</label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder="Enter the summary of the hotel Description"
              value={data?.summaryDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    summaryDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}
        <EditTitle
          isInput={true}
          isShow={isEditTitle}
          closeHandler={() => setIsEditTitle(false)}
          data={title}
          changeHandler={(e) => {
            if (intigator === "room") {
              setRoomsTitle(e);
            } else if (intigator === "spa") {
              setData((prev) => {
                return {
                  ...prev,
                  spaTitle: e,
                };
              });
            } else if (intigator === "res") {
              setData((prev) => {
                return {
                  ...prev,
                  restaurantTitle: e,
                };
              });
            }

            setIsEditTitle(false);
          }}
        />
        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">
            {roomsTitle}
            <button
              onClick={() => {
                setIsEditTitle(true);
                setTitle(roomsTitle);
                setInitgator("room");
              }}
            >
              <FiEdit />
            </button>
          </label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder={roomsTitle}
              value={data?.roomsDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    roomsDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}
      </div>
      <div className="buttons">
        {(isSpa && (
          <div className="hotel-form-details-item full">
            <label htmlFor="">
              {data?.spaTitle}
              <button
                onClick={() => {
                  setIsEditTitle(true);
                  setTitle(data?.spaTitle);
                  setInitgator("spa");
                }}
              >
                <FiEdit />
              </button>
            </label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder={data?.spaTitle}
                value={data?.spaDescription}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      spaDescription: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
          </div>
        )) || (
          <button
            onClick={(e) => {
              setIsSpa(true);
              setData((prev) => {
                return {
                  ...prev,
                  spaTitle: "Descrizione Spa",
                };
              });
            }}
          >
            <BiPlus />
            Add Spa Description
          </button>
        )}{" "}
        {isRestu ? (
          <div className="hotel-form-details-item full">
            <label htmlFor="hotelDescription">
              {data?.restaurantTitle}
              <button
                onClick={() => {
                  setIsEditTitle(true);
                  setTitle(data?.restaurantTitle);
                  setInitgator("res");
                }}
              >
                <FiEdit />
              </button>
            </label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder={data?.restaurantTitle}
                value={data?.restaurantDescription}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    restaurantDescription: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsRestu(true);
              setData((prev) => {
                return {
                  ...prev,
                  restaurantTitle: "Descrizione ristorante",
                };
              });
            }}
          >
            <BiPlus />
            Add Restaurant Description
          </button>
        )}
      </div>
    </>
  );
}
