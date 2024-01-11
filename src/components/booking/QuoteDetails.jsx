import moment from "moment";
import { useEffect, useRef, useState, forwardRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { FaPercentage, FaUserAlt } from "react-icons/fa";
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
import values from "../../../values";
import Tags from "./Tags";
import TimeSlot from "./TimeSlot";
import UserDetails from "./UserDetails";
import axios from "axios";
import TransportDetails from "./TransportDetails";
import TransportDetails2 from "./TransportDetails2";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

export default function QuoteDetails({
  isDetails,
  handler,
  isIndex,
  isUser,
  currentUserId,
  setCurrentUserId,
  transpData,
  setTranspData,
}) {
  const date = new Date();
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isSuggest, setIsSuggest] = useState(false);
  const [cityInp, setCityInp] = useState("city");
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBen1zTUuynCgRfIStX1NqhEp_eHat4n0k",
    libraries: ["places"],
  });
  const cityInput = useRef();

  // const displaydata = values.displayData;
  const [formInfo, setFormInfo] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [transport, setTransport] = useState([]);

  // const transportId = (transpData && transpData[currentUserId])?[...transpData[currentUserId]]:[]
  // const setTransportId = (ob)=>{setTranspData({ob})}
  const [transportId, setTransportId] = useState([]);

  const [keyCt, setKeyCt] = useState(1);
  function filterUserById(usersArray, targetId) {
    // return usersArray.filter(user => user._id === targetId);
    return response?.data.filter((user) => user._id === a?.userId);
  }
  const breakDownTypeChecker = (currentOffer) => {
    if (currentOffer?.breakdown[1].price != 0) {
      return currentOffer?.breakdown[1].breakdownId;
    } else if (currentOffer?.breakdown[0].price != 0) {
      return currentOffer?.breakdown[0].breakdownId;
    } else if (currentOffer?.breakdown[2].price != 0) {
      return currentOffer?.breakdown[2].breakdownId;
    }
  };

  // Custom input for autocomplete
  const CustomInput = forwardRef((props, ref) => {
    console.log("Custom input ", props);
    const {
      required,
      type,
      value,
      handleChange,
      label,
      select,
      options,
      name,
      optional,
      hasValue,
      ...rest
    } = props;
    return (
      <div className="position-relative">
        <label className="__form-label">
          <span className="pe-0">{label}</span>
          {!optional && (
            <span
              className="ps-0"
              style={{ fontSize: "16px", lineHeight: "1" }}
            >

            </span>
          )}
        </label>
        {!select ? (
          <input
            type={type}
            className={`${value && "has-value"} form-control __form-control`}
            value={value}
            name={name}
            onChange={handleChange}
            ref={ref}
            {...rest}
          />
        ) : options ? (
          options.length ? (
            options.length === 1 ? (
              <input
                type={type}
                className={`${value && "has-value"
                  } form-control __form-control truncate`}
                value={options[0].text || options[0].name}
                name={name}
                ref={ref}
                {...rest}
                readOnly
              />
            ) : (
              <select
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
                className="form-control __form-control form-select "
              >
                {options &&
                  options?.map((item, i) => (
                    <option
                      key={i}
                      value={item.text || item.name}
                      style={{ color: "black" }}
                    >
                      {`${item.text}` || item.name}
                    </option>
                  ))}
              </select>
            )
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    );
  });

  const offerPriceCal = (activeData) => {
    let temp = 0;
    const checkinDate = new Date(activeData.checkIn);
    const checkoutDate = new Date(activeData.checkOut);
    let calculatedNights = Math.ceil(
      (checkoutDate - checkinDate) / (24 * 60 * 60 * 1000)
    );
    return activeData?.minStay === activeData?.maxStay
      ? activeData.breakdown[breakDownTypeChecker(activeData) - 1]?.price
      : (!(activeData?.minStay === activeData?.maxStay) &&
        activeData?.id === activeData?.id
        ? temp !== 0
          ? temp
          : activeData.breakdown[breakDownTypeChecker(activeData) - 1].price
        : activeData.breakdown[breakDownTypeChecker(activeData) - 1].price) *
      calculatedNights;
  };
  function filterOffersByCriteria(offers, mainOffer) {
    const checkinDate = new Date(mainOffer?.checkIn);
    const checkoutDate = new Date(mainOffer?.checkOut);
    let MainofferNights = Math.ceil(
      (checkoutDate - checkinDate) / (24 * 60 * 60 * 1000)
    );
    // console.log(checkinDate, checkoutDate, MainofferNights);
    // console.log(offers)
    let list = offers?.filter((offer) => {
      // if (
      //   Math.abs(new Date(offer.endDate) - new Date(mainOffer.checkOut)) <=
      //   3 * 24 * 60 * 60 * 1000
      // ) {
      //   console.log(
      //     Math.abs(new Date(offer.startDate) - new Date(mainOffer.checkIn)) <=
      //       3 * 24 * 60 * 60 * 1000,
      //     Math.abs(new Date(offer.endDate) - new Date(mainOffer.checkOut)) <=
      //       3 * 24 * 60 * 60 * 1000,
      //     Math.abs(offer.maxStay - MainofferNights) <= 3
      //   );
      // }

      return (
        Math.abs(new Date(offer?.startDate) - new Date(mainOffer?.checkIn)) <=
        3 * 24 * 60 * 60 * 1000 &&
        Math.abs(new Date(offer?.endDate) - new Date(mainOffer?.checkOut)) <=
        3 * 24 * 60 * 60 * 1000 &&
        Math.abs(offer?.maxStay - MainofferNights) <= 3
      );
    });
    // console.log(list)
    return list;
  }

  // Function to calculate compatibility score based on total price
  function calculateCompatibilityScore(offer, mainOffer) {
    let offerPrice = offerPriceCal(offer);
    // console.log(offerPrice, mainOffer.price);
    const priceDifference = Math.abs(offerPrice - mainOffer?.price);

    if (mainOffer?.price <= 500) {
      return priceDifference <= 100;
    } else if (mainOffer?.price <= 1000) {
      return priceDifference <= 150;
    } else if (mainOffer?.price <= 2000) {
      return priceDifference <= 200;
    } else {
      return priceDifference <= 300;
    }
  }

  // Function to select one compatible offer from each hotel
  function selectCompatibleOffers(hotels, mainOffer) {
    const result = [];

    for (const hoteli of hotels) {
      const compatibleOffers = filterOffersByCriteria(hoteli.offers, mainOffer);
      if (compatibleOffers?.length > 0) {
        // console.log(compatibleOffers)
        const selectedOffer = compatibleOffers.find((offer) => {
          if (offer?.id != mainOffer?.offerName) {
            return calculateCompatibilityScore(offer, mainOffer);
          }
        });
        // console.log(selectedOffer.id, mainOffer.offerName);
        if (selectedOffer) {
          result.push({
            hotel: {
              id: hoteli.id,
              hotelName: hoteli.name,
              ofFerId: selectedOffer.id,
            },
            offer: selectedOffer,
          });
        }
      }
    }

    return result;
  }
  useEffect(() => {
    if (isIndex == null) return;
    async function renderGetUserData(a) {
      if (a != null && a != undefined) {
        setFormInfo(null);
        try {
          const response = await axios.get(`${values.url}/booking/user`);
          setFormInfo([
            {
              label: "Nome",
              value: response?.data.filter((user) => user._id === a?.userId)[0]
                .fName,
            },
            {
              label: "Cognome",
              value: response?.data.filter((user) => user._id === a?.userId)[0]
                .lName,
            },
            {
              label: "email",
              value: response?.data.filter((user) => user._id === a?.userId)[0]
                .email,
            },
            {
              label: "Numero di Telefono",
              value: response?.data.filter((user) => user._id === a?.userId)[0]
                .phone,
              country: true,
            },
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    async function renderbookingData() {
      setCurrentBooking(null);
      await axios
        .get(`${values.url}/booking?id=${isIndex + 1}`)
        .then((response) => {
          setCurrentBooking(response.data[isIndex]);
          setCityInp(response.data[isIndex].citta);
          window.currentBooking = response.data[isIndex];
          renderGetUserData(response.data[isIndex]);
          setSug(
            selectCompatibleOffers(
              window.hotelsList,
              response.data[isIndex].dates[0]
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    renderbookingData();
    // async function renderHotels() {
    //   await axios
    //     .get(`${values.url}/app/hotels`)
    //     .then(async (response) => {
    //       let list =selectCompatibleOffers(response.data, currentBooking?.dates[0]);
    //       setSug(list)
    //       window.sug =list
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // }
    // renderHotels();
    // setIsSuggest(false);
  }, [isIndex]);
  const [sug, setSug] = useState(null);
  useEffect(() => {
    if (currentBooking == null) {
      setTransport([]);
      return;
    }
    if (currentBooking?.bags != "Nessuna") {
      async function getTrans() {
        await axios
          .get(
            `${values.url}/transport/getTransport/${currentBooking?.dates[0].checkIn}`
          )
          .then((response) => {
            // console.log("Response data",response.data)
            setTransport(response.data);
            if (response.data.length) {
              setTransportId([response.data[0].transportId]);
            } else {
              setTransportId([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      getTrans();
    } else if (currentBooking?.carSize != "Nessuna") {
      async function getTrans2() {
        await axios
          .get(
            `${values.url}/transport/getTransport2/${currentBooking?.dates[0].checkIn}`
          )
          .then((response) => {
            console.log("Response data", response.data);
            setTransport(response.data);
            if (response.data.length) {
              console.log(response.data[0], "res data");
              setTransportId([response.data[0].transportId]);
            } else {
              setTransportId([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      getTrans2();
    } else if (
      currentBooking?.citta != "Nessuna" &&
      currentBooking?.trantrasporto != "Nessuna"
    ) {
      // console.log("Welcome to case 3");
      async function getTrans3() {
        var vehicleType = "";
        if (currentBooking?.trasporto.split(" ")[0] == "Bus")
          vehicleType = "Bus";
        else if (currentBooking?.trasporto.split(" ")[0] == "Treno")
          vehicleType = "Treno";
        else if (currentBooking?.trasporto.split(" ")[0] == "Volo")
          vehicleType = "Volo";
        var cords = currentBooking?.citta.split(/[()]/)[1];
        var curLat = Number(cords.split(",")[0]);
        var curLon = Number(cords.split(",")[1]);
        // console.log("curLat ", curLat);
        // console.log("curLon ", curLon);
        function getDistanceFromLatLonInKm(
          lat1,
          lon1,
          lat2 = curLat,
          lon2 = curLon
        ) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);

          function deg2rad(deg) {
            return deg * (Math.PI / 180);
          }
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          return d;
        }

        await axios
          .get(
            `${values.url}/transport/getTransport3/${currentBooking?.dates[0].checkIn}/${vehicleType}`
          )
          .then((response) => {
            console.log("Response data", response.data);
            if (response.data.length) {
              var lis = [];
              var curDist = 50;

              while (lis.length == 0) {
                for (const obj of response.data) {
                  if (
                    getDistanceFromLatLonInKm(
                      Number(obj.address.split(",")[0]),
                      Number(obj.address.split(",")[1])
                    ) <= curDist
                  ) {
                    lis.push(obj);
                  }
                }
                curDist += 50;
              }
              setTransport(lis);
              setTransportId([lis[0].transportId]);
            } else {
              setTransportId([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      getTrans3();
    }
  }, [currentBooking]);
  const [transInp, setTransInp] = useState("");
  const [status, setStatus] = useState("To be Processed"); // Default status is "To be Processed"
  const handlesubmit = () => {
    const addNewBooking = async function (req, res) {
      const {
        id,
        nome,
        cognome,
        email,
        numero_di_telefono,
        nvia_messaggio,
        tag,
        numero_di_persone,
        numero_di_bagagli,
        dimensione_auto,
        tipo_di_trasporto_preferito,
        città_de_partenza,
        notes,
        periodo_soggiorno,
        dates,
      } = req.body;
      try {
        const newBooking = new Booking({
          id,
          nome,
          cognome,
          email,
          numero_di_telefono,
          nvia_messaggio,
          tag,
          numero_di_persone,
          numero_di_bagagli,
          dimensione_auto,
          tipo_di_trasporto_preferito,
          città_de_partenza,
          notes,
          periodo_soggiorno,
          dates,
        });

        const result = await newBooking.save();
        console.log(result);
        res.status(200).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({
          errors: {
            msg: "Internal server error",
          },
        });
      }
    };
    setStatus("Preventivo Inviato");
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
  function formatItalianDate(inputDate) {
    // Define an array of Italian month names
    var monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    if (inputDate != undefined) {
      // Split the input date string into start and end parts
      var dateParts = inputDate.split(" - ");
      var startDayMonth = dateParts[0].trim().split(" ");
      var endDayMonth = dateParts[1].trim().split(" ");

      // Convert the day and short form of the month to numbers
      var startDay = parseInt(startDayMonth[0]);
      var endDay = parseInt(endDayMonth[0]);

      // Use a switch statement to get the month index based on the short form
      var startMonthIndex, endMonthIndex;

      switch (startDayMonth[1]) {
        case "gen":
          startMonthIndex = 0; // January
          break;
        case "feb":
          startMonthIndex = 1; // February
          break;
        case "mar":
          startMonthIndex = 2; // March
          break;
        case "apr":
          startMonthIndex = 3; // April
          break;
        case "mag":
          startMonthIndex = 4; // May
          break;
        case "giu":
          startMonthIndex = 5; // June
          break;
        case "lug":
          startMonthIndex = 6; // July
          break;
        case "ago":
          startMonthIndex = 7; // August
          break;
        case "set":
          startMonthIndex = 8; // September
          break;
        case "ott":
          startMonthIndex = 9; // October
          break;
        case "nov":
          startMonthIndex = 10; // November
          break;
        case "dic":
          startMonthIndex = 11; // December
          break;
        default:
          startMonthIndex = -1; // Invalid month
      }

      switch (endDayMonth[1]) {
        case "gen":
          endMonthIndex = 0; // January
          break;
        case "feb":
          endMonthIndex = 1; // February
          break;
        case "mar":
          endMonthIndex = 2; // March
          break;
        case "apr":
          endMonthIndex = 3; // April
          break;
        case "mag":
          endMonthIndex = 4; // May
          break;
        case "giu":
          endMonthIndex = 5; // June
          break;
        case "lug":
          endMonthIndex = 6; // July
          break;
        case "ago":
          endMonthIndex = 7; // August
          break;
        case "set":
          endMonthIndex = 8; // September
          break;
        case "ott":
          endMonthIndex = 9; // October
          break;
        case "nov":
          endMonthIndex = 10; // November
          break;
        case "dic":
          endMonthIndex = 11; // December
          break;
        default:
          endMonthIndex = -1; // Invalid month
      }

      // Check if the month index is valid
      if (startMonthIndex === -1 || endMonthIndex === -1) {
        return "Invalid month in input date";
      }
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      // Return the formatted date range
      return (
        startDay +
        " " +
        monthNames[startMonthIndex] +
        " " +
        currentYear +
        " - " +
        endDay +
        " " +
        monthNames[endMonthIndex] +
        " " +
        currentYear
      );
    }
  }
  const addMoreHandler = () => {
    let arr = sug;
    arr.push({
      offer: currentBooking?.dates[0].actualOffer,
      hotel: [
        {
          id: new Date().getTime() + Math.random(),
          offerName: new Date().getTime() + Math.random(),
          hotelName: "",
        },
      ],
    });
    setSug(arr);
    console.log(sug);
  };
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

  const [options, setOptions] = useState([
    {
      name: "Trasporto Option 1",
      op: ["Bus + Bus", "Bus", "Trin"],
    },
    {
      name: "Fare",
      value: "$20",
    },
    {
      name: "Trasporto Option 2",
      op: ["Bus + Bus", "Bus", "Trin"],
    },
    {
      name: "Fare",
      value: "$15",
    },
  ]);

  // const [finali, setFinali] = useState("1600");
  // const final=useRef();
  // const handleChange = (e) => {
  //   // Remove the € symbol if present in the input
  //   const newValue = e.target.value.replace("€", "");
  //   setFinali(newValue);
  // };

  return (
    sug != null && (
      <div className={`details ${(isDetails && "show") || ""}`}>
        <div className="details-wrp">
          <div className="details-head">
            <div className="details-head-top">
              <div className="details-head-top-left">
                <button onClick={() => handler(false)}>
                  <FaCircleChevronRight />
                </button>
                <h4>ID #{isIndex + 1}</h4>
                {/* user id to be added */}
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
                Data Richiesta: :{" "}
                <span>{formatDateItalian(currentBooking?.date)} </span>
              </p>
            </div>
          </div>

          <CopyLink
            hotelId={currentBooking?.dates[0].hotelName}
            bookingId={currentBooking?._id}
          />

          <div className="details-body">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form"
              action=""
            >
              <div className="title-btn">
                <PopupTitle title="Dettagli Utente" />
                {isUser && (
                  <>
                    {" "}
                    <button onClick={() => setIsUserDetails(true)}>
                      <FaUserAlt />
                    </button>
                    <UserDetails
                      isDetails={isUserDetails}
                      isIndex={isIndex}
                      handler={setIsUserDetails}
                      quate={false}
                      currentUser={currentUserId}
                      setCurrentUser={setCurrentUserId}
                    />
                  </>
                )}
              </div>
              <div className="form-body">
                {formInfo != null &&
                  formInfo.map((item, i) => (
                    <div key={i} className="form-group">
                      {(item.country && (
                        <>
                          <label htmlFor={i}>{item.label}</label>{" "}
                          <div className="form-group-wrp">
                            <Input data={{ value: item.value }} />
                          </div>
                        </>
                      )) || (
                          <>
                            {" "}
                            <label htmlFor={i}>{item.label}</label>
                            <Input data={{ value: item.value }} />
                          </>
                        )}
                    </div>
                  ))}
              </div>
            </form>
            <SendMessage
              data={{
                text: " ",
              }}
            />
            {/* {console.log(currentBooking)} */}
            <Tags
              userId={currentBooking?.userId}
              bookingDetailsId={currentBooking?._id}
            />
          </div>

          <div className="details-body">
            <PopupTitle title="Dettagli Viaggio" />
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="cirra">Città di Partenza</label>
                  <Input
                    data={{
                      value: currentBooking?.citta,
                      i: 232,
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Periodo">Periodo Soggiorno</label>
                  <Input
                    data={{
                      value: formatItalianDate(currentBooking?.dateLine),
                      i: 12,
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          {/* && currentBooking?.citta == "Nessuna" && currentBooking?.carSize=="Nessuna" */}
          {transport == [] && (
            <div className="details-body ">
              <div className="add-option">
                <button>Nessun Transporto Richiesto </button>
                <p>
                  La selezione del transporto avverra nella pagina del
                  preventivo
                </p>
              </div>
            </div>
          )}
          {/* <div className="col-sm-6">
            <Autocomplete
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlaceChanged={() => {
                // placeChanged(autocomplete.getPlace())
                const place = autocomplete.getPlace();
                setCurrentBooking({
                  ...currentBooking,
                  citta: `${
                    cityInput.current.value
                  } (${place.geometry.location.lat()},${place.geometry.location.lng()})`,
                });
              }}
              options={{
                types: ["(cities)"],
                language: "it",
              }}
            >
              <input/>
              <CustomInput
                type="text"
                label="Città de Partenza"
                placeholder="Inserisci la città di partenza"
                value={ cityInp }
                name="Citta"
                handleChange={(e) => {
                  setCityInp(e.target.value);
                }}
                style={{ fontFamily: "chillax", fontSize: "16px" }}
                ref={cityInput}
              /> 
            </Autocomplete>
          </div> */}
          {(currentBooking?.bags != "Nessuna" ||
            currentBooking.carSize != "Nessuna" ||
            (currentBooking?.citta != "Nessuna" &&
              currentBooking?.trantrasporto != "Nessuna")) &&
            transportId != [] && (
              <div className="details-body ">
                {/* this enitre option div should be dynamic...can be added more and deleted */}
                {/* perform the calculations when transInp in transport option changes by putting it in useeffect and calculating price out there...you can add a route in backend which receives transport objects from its id */}

                {transportId.map((elm, i) => {
                  {
                    return (
                      <div
                        className="add-option"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          borderTop: "2px solid #000",
                          borderBottom: "2px solid #000",
                          padding: "10px",
                        }}
                      >
                        <button
                          style={{ color: "red" }}
                          onClick={() => {
                            console.log(
                              "delete ",
                              transportId.filter((val, ind) => ind != i)
                            );
                            setTransportId(
                              transportId.filter((val, ind) => ind != i)
                            );
                          }}
                        >
                          Delete{" "}
                        </button>
                        <TransportDetails
                          currentBooking={currentBooking}
                          i={i}
                          list={transportId}
                          setList={(l) => setTransportId(l)}
                          transportL={transport}
                          transOb={elm}
                        />
                      </div>
                    );
                  }
                })}

                <div className="add-option">
                  <button
                    onClick={() => {
                      setTransportId([...transportId, ""]);
                      setKeyCt(keyCt + 1);
                    }}
                  >
                    <span>
                      <AiOutlinePlus />
                    </span>{" "}
                    Add More Trasporto Option{" "}
                  </button>
                  <p>
                    Questa è la lista di tutti i preventivi richiesti dai vari
                    portali
                  </p>
                </div>
              </div>
            )}
          <div style={{ marginLeft: "3.8%", marginTop: "32px" }}>
            <PopupTitle title="Hotel Selezionato" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <HotelSuggest
              currentBooking={currentBooking}
              isIndex={isIndex}
              mainOffer={currentBooking?.dates[0]}
              className="blue"
            />
            <div style={{ marginLeft: "3.8%" }}>
              <PopupTitle title="Hotel Suggeriti" />
              <p style={{ color: "gray", fontWeight: "medium", fontSize: "14px", marginTop: "-10px" }}>
                Qui ci sono gli hotel che verranno mostrati nella sezione Hoteli Suggeriti
              </p>
            </div>
            {currentBooking != null &&
              currentBooking != undefined &&
              sug.map((s, i) => {
                return (
                  s.hotel.id != currentBooking?.dates[0].hotelName && (
                    <div style={{ marginTop: "1px" }}>
                      <HotelSuggest
                        className="green"
                        currentBooking={{
                          ...currentBooking,
                          dates: [
                            {
                              checkIn: currentBooking?.dates[0].checkIn,
                              checkOut: currentBooking?.dates[0].checkOut,
                              actualName: currentBooking?.dates[0].actualName,
                              actualOffer: s.offer,
                              actualName: s.hotel.hotelName,
                              hotelName: s.hotel.id,
                              offerName: s.hotel.offerId,
                              price: currentBooking?.dates[0].price,
                              end: currentBooking?.dates[0].end,
                            },
                          ],
                        }}
                        isIndex={isIndex}
                        mainOffer={currentBooking?.dates[0]}
                      />
                    </div>
                  )
                );
              })}
            <div className="details-suggest">
              <div className="addMoreBtn">
                <button onClick={addMoreHandler}>
                  <AiOutlinePlus /> Add more suggest hotels
                </button>
              </div>
            </div>
            <div className="details-footer">
              <div className="details-footer-item"></div>{" "}
              <div className="details-footer-item">
                <SendBtn
                  data={{ send: "Send Quote", sent: "Quote Sent" }}
                  onClick={handlesubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
