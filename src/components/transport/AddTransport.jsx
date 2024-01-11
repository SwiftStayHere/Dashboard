import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import values from "../../../values";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";
import Catagory from "./Catagory";
import Days from "./Days";
import EditableSelect from "./EditableSelect";
import EditableSelectCity from "./EditableSelectCity";
import Hours from "./Hours";
import StartEndDate from "./StartEndDate";
import Timing from "./Timing";

export default function AddTransport({
  handler,
  addhotel,
  add,
  transportData,
  isDup,
}) {
  const bg = add ? "transparent" : "red";
  const cl = add ? "black" : "white";

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  // valid postale code
  const [isValid, setIsValid] = useState(true);
  const [isBack, setIsBack] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isPrice, setIsPrice] = useState(false);

  const createHandler = () => {
    if (data.pricing.length) {
      if (data?.name) {
        if (add || isDup) {
          axios
            .post(`${values.url}/transport`, data, {
              headers: {
                token,
              },
            })
            .then((d) => {
              window.location.reload();
            })
            .catch((e) => {
              console.log(e.response);
            });
        } else {
          axios
            .put(`${values.url}/transport`, data, {
              headers: {
                token,
              },
            })
            .then((d) => {
              window.location.reload();
            })
            .catch((e) => {
              console.log(e.response);
            });
        }
      } else {
        setIsError(true);
      }
    } else {
      if (!data?.pricing?.length) {
        setIsPrice(true);
      }
    }
  };

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (isChange) {
          setIsBack(true);
          handler(true);
          setIsDelete(true);
          setIsRemove(false);
        } else {
          setIsDelete(false);
          handler(false);
        }
      }
    });
  });

  // development
  const [data, setData] = useState({
    name: "",
    transportId: values.generateUniqueString(),
    city: "",
    state: "",
    zip: "",
    address: "",
    vehicleType: "",
    vehicleBrand: "",
    date: [
      {
        start: "",
        end: "",
      },
    ],
    days: [],
    pricing: [],
    hours: [],
    timing: [],
  });

  const [citysName, setCitysName] = useState([
    "Abruzzo",
    "Basilicata",
    "Calabria",
    "Campania",
    "Emilia-Romagna",
    "Friuli-Venezia Giulia",
    "Lazio",
    "Liguria",
    "Lombardia",
    "Marche",
    "Molise",
    "Piemonte",
    "Puglia",
    "Sardegna",
    "Sicilia",
    "Toscana",
    "Trentino-Alto Adige",
    "Umbria",
    "Valle d'Aosta",
    "Veneto",
  ]);

  // update data

  useEffect(() => {
    setIsError(false);
    setIsPrice(false);
    setIsValid(true);
    setIsDelete(false);
    setIsChange(false);

    if (add) {
      setData({
        name: "",
        transportId: values.generateUniqueString(),
        city: "",
        state: "",
        zip: "",
        address: "",
        vehicleType: "",
        vehicleBrand: "",
        date: [
          {
            start: "",
            end: "",
          },
        ],
        days: [],
        pricing: [],
        hours: [],
      });
    } else {
      if (transportData && !add) {
        setData(transportData);
      } else {
        setData({
          name: "",
          transportId: values.generateUniqueString(),
          city: "",
          state: "",
          zip: "",
          address: "",
          vehicleType: "",
          vehicleBrand: "",
          date: [
            {
              start: "",
              end: "",
            },
          ],
          days: [],
          pricing: [],
          hours: [],
        });
      }
    }
  }, [transportData, add]);

  // delete
  const [isDelete, setIsDelete] = useState(false);

  const deleteHandler = () => {
    setIsBack(false);
    if (add || isDup) {
      setIsChange(false);
      setIsRemove(false);
      setData({
        name: "",
        transportId: values.generateUniqueString(),
        city: "",
        state: "",
        zip: "",
        address: "",
        vehicleType: "",
        vehicleBrand: "",
        date: [
          {
            start: "",
            end: "",
          },
        ],
        days: [],
        pricing: [],
        hours: [],
      });

      handler(false);
    } else {
      if (isRemove) {
        axios
          .delete(`${values.url}/transport?id=${data?._id}`, {
            headers: {
              token,
            },
          })
          .then((d) => {
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setData(transportData);
        handler(false);
      }
    }
  };

  useEffect(() => {
    setIsDelete(false);
  }, [addhotel]);

  useEffect(() => {
    if (isDup) {
      if (transportData && isDup) {
        // delete transportData._id;
        // transportData.name = "";
        // transportData.transportId = values.generateUniqueString();

        setData({
          ...transportData,
          _id: null,
          name: "",
          transportId: values.generateUniqueString(),
        });
        setIsChange(true);
      } else if (!add) {
        setData(transportData);
      } else {
        setData({
          name: "",
          transportId: values.generateUniqueString(),
          city: "",
          state: "",
          zip: "",
          address: "",
          vehicleType: "",
          vehicleBrand: "",
          date: [
            {
              start: "",
              end: "",
            },
          ],
          days: [],
          pricing: [],
          hours: [],
        });
      }
    }
  }, [transportData, isDup]);

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} add-transport`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <FaCarSide />
          </span>
          <button
            onClick={() => {
              if (isChange) {
                if (add) {
                  setIsDelete(true);
                } else {
                  setIsBack(true);
                  setIsRemove(false);
                  setIsDelete(true);
                }
              } else {
                handler(false);
              }
            }}
            className="close"
          >
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4 className="s-title">
            {(add && "Crea un nuovo Trasporto") ||
              (isDup && "Duplica Trasporto") ||
              "Modifica Trasporto"}
          </h4>
          <p>Inserisci o modifica le informazioni del trasporto qui sotto</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item item-1 ${(isError && "error") || ""}`}
            >
              <label htmlFor="">Nome Trasporto</label>
              <Input
                d={{ value: data?.name, label: "Nome Trasporto" }}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      name: e,
                    };
                  });
                }}
              />
            </div>{" "}
            <div className={`add-hotel-item `}>
              <label htmlFor="">Trasporto ID</label>
              <Input d={{ value: data?.transportId, label: "Trasporto ID" }} />
            </div>{" "}
          </form>

          <h4>Punto di Partenza</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Regione</label>
              <Select
                activeValue={data?.city || "Seleziona Regione"}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      city: e,
                      state: "",
                      zip: "",
                    };
                  });
                }}
                data={citysName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Città</label>

              <EditableSelectCity
                activeValue={data?.state || "Seleziona Città"}
                mainData={data}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      state: e.name,
                      zip: e.zip,
                    };
                  });
                }}
              />
            </div>
            <div className={`form-group ${(!isValid && "error") || ""}`}>
              <label htmlFor="">Codice Postale</label>
              <Input
                d={{ value: data?.zip, label: "Codice Postale" }}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      zip: e,
                    };
                  });
                  setIsValid(true);
                }}
              />
            </div>
          </div>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Coordinate Punto di Partenza</label>
              <Input
                d={{
                  value: data?.address,
                  label:
                    "Inserisci Coordinate (42.69325378735576, 11.708567085372382)",
                }}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      address: e,
                    };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Dettagli Trasporto</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Tipo di Veicolo</label>
              <Select
                activeValue={
                  data?.vehicleType || "Seleziona un tipo di veicolo"
                }
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      vehicleType: e,
                      vehicleBrand: "",
                    };
                  });
                }}
                data={["Treno", "Bus", "Aereo", "Nave", "Aliscafo"]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Marchio</label>
              <EditableSelect
                activeValue={data?.vehicleBrand || "Seleziona un Marchio"}
                handler={(e) => {
                  setIsChange(true);
                  setData((prev) => {
                    return {
                      ...prev,
                      vehicleBrand: e,
                    };
                  });
                }}
                name="vahicale"
                mainData={data}
              />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Periodo di Validità</h4>
          <p>
            Inserisci il periodo di validità in cui verrà preso in
            considerazione questo trasporto
          </p>
          <StartEndDate
            transportData={transportData}
            data={data?.date}
            setIsChange={setIsChange}
            setData={setData}
            add={add}
            dd={data}
          />
          <Timing
            transportData={transportData}
            data={data?.timing}
            setIsChange={setIsChange}
            setData={setData}
            add={add}
            dd={data}
          />
          <Days
            setIsChange={setIsChange}
            transportData={transportData}
            data={data?.days}
            setData={setData}
            add={add}
          />
          <div className="hours">
            <strong className="hour-s">Orari di Partenza</strong>
            <Hours
              setIsChange={setIsChange}
              transportData={transportData}
              data={data?.hours}
              handler={setData}
              add={add}
            />
          </div>
        </div>{" "}
        <div className="add-hotel-body gap">
          <h4>Prezzo per Categoria</h4>
          <Catagory
            isPrice={isPrice}
            setIsPrice={() => setIsPrice()}
            setIsChange={setIsChange}
            transportData={transportData}
            add={add}
            data={data?.pricing}
            setData={setData}
          />
        </div>
        <div className="add-hotel-footer">
          <button
            style={{ backgroundColor: bg, color: cl }}
            onClick={() => {
              if (!add && !isDup) {
                setIsRemove(true);
                setIsDelete(true);
              } else {
                if (isChange) {
                  setIsDelete(true);
                } else {
                  handler(false);
                }
              }
            }}
            className="btn cancel "
          >
            {((add || isDup) && "Torna Indietro") || "Elimina"}
          </button>
          <button onClick={createHandler} className="btn">
            {(add && "Aggiungi Nuovo Trasporto") ||
              (isDup && "Aggiungi Nuovo Trasporto") ||
              "Salva Modifiche"}
          </button>
        </div>
        {isDelete && (
          <div className="isdelete">
            <h2 className="jakarta">
              {(!isRemove && "Vuoi tornare alla lista?") ||
                (isDup && "Vuoi tornare alla lista?") ||
                `Vuoi eliminare ${data?.name}?`}
            </h2>
            <p className="jakarta">
              {(!isRemove &&
                "Tornando alla lista perderai la configurazione che stai creando") ||
                "Eliminandolo non sarà più possibile recuperarlo"}
            </p>
            <div className="buttons">
              <button
                onClick={() => {
                  setIsDelete(false);
                  handler(true);
                }}
                className="btn"
              >
                Annulla
              </button>
              <button onClick={deleteHandler} className="delete-btn btn">
                {(add && "Torna alla Lista") ||
                  (isDup && "Torna Indietro") ||
                  (isBack && "Torna Indietro") ||
                  "Elimina"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
