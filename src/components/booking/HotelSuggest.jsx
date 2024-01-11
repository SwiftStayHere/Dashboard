import { useState, useEffect,useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Select from "../basic/Select";
import Input from "./Input";
import axios from "axios";
import values from "../../../values";
import Item from "./Item";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupTitle from "../basic/PopupTitle";
import { useMouseSensor } from "react-beautiful-dnd";
import { invalid } from "moment/moment";
import Room from "./Room";
import { HiLocationMarker } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function HotelSuggest({
  currentBooking,
  isIndex,
  mainOffer,
  className
}) {
  const [isSuggest,setIsSuggest] = useState(false);
  const [roomPrice, setRoomPrice] = useState([]);
  const sumField = (field, array) => {
    return array.reduce((total, obj) => {
      // Check if the object is not null or undefined and has the specified field
      if (obj && obj[field] !== undefined) {
        return total + obj[field];
      }
      return total;
    }, 0);
  };
  // const handleRoomStateChange = (index, tot, newP) => {

  //   setRoomPrice((prevStates) => {
  //     const newStates = [...prevStates];
  //     const existingState = newStates[index];

  //     // Only update the state if values have changed
  //     if (
  //       !existingState ||
  //       existingState.tot !== tot ||
  //       existingState.newP !== newP
  //     ) {
  //       console.log("nii")
  //       newStates[index] = { tot, newP };
  //       setFinalTotPrice((prev) => sumField("tot", newStates));
  //       setFinalNewPrice((prev) => sumField("newP", newStates));
  //     }

  //     return newStates;
  //   });
  // };
  const SuggestHotel = ({ data }) => {
    const [userAdded, setUserAdded] = useState("");
    const [finalTotPrice, setFinalTotPrice] = useState(
      () =>
        Number(currentBooking?.dates[0].price) *
        Number(
          Number(currentBooking?.tipi[0]) + Number(currentBooking?.tipi[10])
        )
    );
    const [finalNewPrice, setFinalNewPrice] = useState(
      () =>
        Number(currentBooking?.dates[0].price) *
        Number(
          Number(currentBooking?.tipi[0]) + Number(currentBooking?.tipi[10])
        )
    );
    const [ageRed, setAgeRed] = useState(null);
    const [thirdInputLable, setThirdInputLable] = useState("Select one option");
    const updateLable = (d) => {
      if (d == "€") {
        setThirdInputLable("Prezzo stanza");
        setUserAdded("price");
      } else {
        setThirdInputLable("Sconto Totale sulla Stanza");
        setUserAdded("discount");
      }
    };

   const [obj, setObj] = useState([]);
   const [tempValues, setTempValues] = useState([]);
   const [discount,setDiscount]=useState([]);
     const handleTempiChange = (newTemp, index) => {
      setTempValues((prev)=>{
              const updatedTempValues = [...prev];
              updatedTempValues[index] = newTemp;

            return updatedTempValues
      })
        
     };
          const handleDiscountChange = (newTemp, index) => {
            setDiscount((prev) => {
              const updatedTempValues = [...prev];
              updatedTempValues[index] = newTemp;
         
              return updatedTempValues;
            });
          };
    const updateFinal3 = (index1, index2, newValue, type) => {
      setObj((prev) => {
        let newObj = [...prev];
        //  console.log(index1,index2,type,newValue)
        // Check if the obj array is empty, if so, initialize it with an object with empty arrays
        if (newObj.length === 0) {
          newObj.push({ adult: [], child: [] });
        }

        // Clone the object at the specified index
        let updatedObject = { ...newObj[index1] } || {
          adult: [],
          child: [],
        };
        if (type == "Adulto") {
          updatedObject.adult = updatedObject.adult || [];

          // Clone the adult array
          let updatedAdultArray = [...updatedObject.adult];

          // Check if the adult array is long enough, if not, fill with zeros
          // while (updatedAdultArray.length <= index2) {
          //   updatedAdultArray.push(0);
          // }

          // Update the value at the specified index in the adult array
          updatedAdultArray[index2] = newValue;

          // Update the object with the modified adult array
          updatedObject.adult = updatedAdultArray;
        }
        if (type == "Bambino") {
          updatedObject.child = updatedObject.child || [];

          // Clone the adult array
          let updatedAdultArray = [...updatedObject.child];

          // Check if the adult array is long enough, if not, fill with zeros
          // while (updatedAdultArray.length <= index2) {
          //   updatedAdultArray.push(0);
          // }

          // Update the value at the specified index in the adult array
          updatedAdultArray[index2] = newValue;

          // Update the object with the modified adult array
          updatedObject.child = updatedAdultArray;
        }
        // Update the obj array with the modified object
        newObj[index1] = updatedObject;
        data.final.current.value=sumAllValues(newObj);
        return newObj;
      });

      
      // Set the state with the updated obj array
    };
    function sumAllValues(arrayOfObjects) {
      // Initialize sums for adult and child arrays
      let sumAdult = 0;
      let sumChild = 0;

      // Iterate through each object in the array
      arrayOfObjects.forEach((obj) => {
        // Sum the values in the adult array
        sumAdult += obj.adult?obj.adult?.reduce((acc, value) => acc + value, 0):0;

        // Sum the values in the child array
        sumChild += obj.child?obj.child?.reduce((acc, value) => acc + value, 0):0;
      });

      // Return an object with the total sums
      // here
      return sumAdult+sumChild
    }
    const [isDelete,setIsDelete] = useState(false);
    return (
      <>
        <div className="details-suggest-body-top">
          <div className="left">
            <span>Hotel</span>
            <Select
              data={hotels}
              activeValue={currentBooking?.dates[0].actualName}
            />
          </div>
          <div className="separator"></div>
          <div className="right">
            <span>Prezzo Totale</span>
            <strong>
              {sumAllValues(obj) -
                discount?.reduce((acc, temp) => acc + temp, 0)}
              €
            </strong>

            {(sumAllValues(obj) -
              discount?.reduce((acc, temp) => acc + temp, 0) )!=
              tempValues?.reduce((acc, temp) => acc + temp, 0) && (
              <span className="delete">
                {tempValues
                  ? tempValues?.reduce((acc, temp) => acc + temp, 0)
                  : 0}
                €
              </span>
            )}

            <button
              onClick={() => {
                setIsDelete(!isDelete);
              }}
            >
              <BsThreeDotsVertical />
            </button>
            <div className={`btns ${(isDelete && "show") || ""}`}>
              <button
                onClick={() => {
                  setIsDelete(false);
                  data.setIsSuggest(false);
                }}
              >
                {(data.delete && "Delete") || "Chiudi"}
              </button>
            </div>
          </div>
        </div>

        {data.rooms.map((room, i) => (
          <Room
            className={className}
            room={room}
            i={i}
            data={data}
            updateLable={updateLable}
            thirdInputLable={thirdInputLable}
            userAdded={userAdded}
            currentBooking={currentBooking}
            setFinalTotPrice={setFinalTotPrice}
            finalTotPrice={finalTotPrice}
            finalNewPrice={finalNewPrice}
            setFinalNewPrice={setFinalNewPrice}
            updateFinal3={updateFinal3}
            newprici={obj[i]}
            onTempiChange={(newTemp) => handleTempiChange(newTemp, i)}
            onDiscountChange={(newTem) => handleDiscountChange(newTem, i)}
          />
        ))}
      </>
    );
  };

  const [hotels, setHotels] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (currentBooking != null && currentBooking != undefined) {
      setRooms([]); // this line needs to be fixed
      // console.log(currentBooking)
      currentBooking?.guestDetails.map((r, i) => {
        setRooms((prev) => {
          const obj = {
            id: i + 1,
            name: `Stanza ${i + 1}`,
            gust: Array.apply(1, Array(r.adult)),
            gust2: r.childAge,
          };
          return [...prev, obj];
        });
      });
    }
    async function renderHotels() {
      await axios
        .get(`${values.url}/app/hotels`)
        .then(async (response) => {
          // console.log(response.data);
          setHotelList(response.data);
          setHotels(response.data.map((d) => d.name).sort());
          window.hotelsList = response.data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    renderHotels();
  }, [currentBooking]);

  const breakDownTypeChecker = (currentOffer) => {
    if (currentOffer?.breakdown[1].price != 0) {
      return currentOffer?.breakdown[1].breakdownId;
    } else if (currentOffer?.breakdown[0].price != 0) {
      return currentOffer?.breakdown[0].breakdownId;
    } else if (currentOffer?.breakdown[2].price != 0) {
      return currentOffer?.breakdown[2].breakdownId;
    }
  };

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
    const checkinDate = new Date(mainOffer.checkIn);
    const checkoutDate = new Date(mainOffer.checkOut);
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
        Math.abs(new Date(offer.startDate) - new Date(mainOffer.checkIn)) <=
          3 * 24 * 60 * 60 * 1000 &&
        Math.abs(new Date(offer.endDate) - new Date(mainOffer.checkOut)) <=
          3 * 24 * 60 * 60 * 1000 &&
        Math.abs(offer.maxStay - MainofferNights) <= 3
      );
    });
    // console.log(list)
    return list;
  }

  // Function to calculate compatibility score based on total price
  function calculateCompatibilityScore(offer, mainOffer) {
    let offerPrice = offerPriceCal(offer);
    // console.log(offerPrice, mainOffer.price);
    const priceDifference = Math.abs(offerPrice - mainOffer.price);

    if (mainOffer.price <= 500) {
      return priceDifference <= 100;
    } else if (mainOffer.price <= 1000) {
      return priceDifference <= 150;
    } else if (mainOffer.price <= 2000) {
      return priceDifference <= 200;
    } else {
      return priceDifference <= 300;
    }
  }

  // Function to select one compatible offer from each hotel
  function selectCompatibleOffers(hotels, mainOffer) {
    const result = [];

    for (const hoteli of hotels) {
      // console.log(hoteli.id)
      const compatibleOffers = filterOffersByCriteria(hoteli.offers, mainOffer);
      // console.log(compatibleOffers, hoteli.name);
      if (compatibleOffers?.length > 0) {
        // console.log(compatibleOffers)
        const selectedOffer = compatibleOffers.find((offer) => {
          if (offer.id != mainOffer.offerName) {
            return calculateCompatibilityScore(offer, mainOffer);
          }
        });
        // console.log(selectedOffer.id, mainOffer.offerName);
        if (selectedOffer) {
          result.push({ hotel:{id:hoteli.id,hotelName:hoteli.name,ofFerId:selectedOffer.id}, offer: selectedOffer });
        }
      }
    }

    return result;
  }

  // useEffect(() => {
  //   if (mainOffer != undefined && hotelList != undefined) {
  //     let list = selectCompatibleOffers(hotelList, mainOffer);
  //     // console.log(list, mainOffer.hotelName, mainOffer.offerName);
  //   }
  // }, [mainOffer]);
  // here

  const addHotelHandler = () => {
    setRooms((prev) => {
      const item = {
        id: new Date().getTime(),
        name: `Stanza ${prev.length + 1}`,
        gust: [],
        gust2: [],
      };
      return [...prev, item];
    });
  };

  const deleteRoom = (id) => {
    // Filter out the room with the specified id
    const updatedRooms = rooms.filter((room) => room.id !== id);
    // Update the state with the filtered array
    setRooms(updatedRooms);
  };

  const addGustHandler = (e) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === e) {
        // Create a new guest array with the new item added
        const newGuestArray = [...room.gust, undefined];
        // Return a new room object with the updated guest array
        return { ...room, gust: newGuestArray };
      }
      return room; // Return unchanged room for other rooms
    });

    setRooms(updatedRooms); // Set the state with the new array
  };

  const typeAdult = (e, x) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === e) {
        // Create a new guest array with the new item added
        const newGuestArray = [...room.gust2, 17];
        // Return a new room object with the updated guest array
        const indexOfX = room.gust.indexOf(undefined);

        if (indexOfX !== -1) {
          // Create a new guest array without the element at the found index
          const newGuestArray2 = [
            ...room.gust.slice(0, indexOfX),
            ...room.gust.slice(indexOfX + 1),
          ];
          // Return a new room object with the updated guest array
          return { ...room, gust: newGuestArray2, gust2: newGuestArray };
        }
      }
      return room; // Return unchanged room for other rooms
    });

    setRooms(updatedRooms); // Set the state with the new array
  };

  const typeChild = (e, x) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === e) {
        // Create a new guest array with the new item added
        const newGuestArray = [...room.gust, undefined];
        // Return a new room object with the updated guest array
        const indexOfX = room.gust2.indexOf(x);

        if (indexOfX !== -1) {
          // Create a new guest array without the element at the found index
          const newGuestArray2 = [
            ...room.gust2.slice(0, indexOfX),
            ...room.gust2.slice(indexOfX + 1),
          ];
          // Return a new room object with the updated guest array
          return { ...room, gust: newGuestArray, gust2: newGuestArray2 };
        }
      }
      return room; // Return unchanged room for other rooms
    });

    setRooms(updatedRooms); // Set the state with the new array
  };

  const [suggests, setSuggests] = useState([]);

const[totoPrice,setTotoPrice] = useState(0);
  const addMoreHandler = () => {
    const hotel = {
      id: new Date().getTime() + Math.random(),
      isDelete: false,
      rooms: [
        { id: new Date().getTime(), name: "room 1", gust: [1], gust2: [1] },
      ],
    };
    setSuggests((prev) => {
      return [...prev, hotel];
    });
  };

  const addDataToRooms = (suggestId) => {
    setSuggests((prevState) => {
      // Find the suggest that matches the given ID
      const updatedSuggests = prevState.map((suggest) => {
        if (suggest.id === suggestId) {
          // Create a new room object and add it to the rooms array
          const newRoom = {
            id: new Date().getTime(),
            name: `room ${suggest.rooms.length + 1}`,
            gust: [1],
            gust2: [],
          };
          return { ...suggest, rooms: [...suggest.rooms, newRoom] };
        }
        return suggest;
      });
      return updatedSuggests;
    });
  };

  const addGuestToRoom = (suggestId, roomId) => {
    setSuggests((prevState) => {
      // Find the suggest that matches the given ID
      const updatedSuggests = prevState.map((suggest) => {
        if (suggest.id === suggestId) {
          // Find the room that matches the given ID
          const updatedRooms = suggest.rooms.map((room) => {
            if (room.id === roomId) {
              // Add the guest to the guests array for this room
              return { ...room, gust: [...room.gust, 1] };
            }
            return room;
          });
          return { ...suggest, rooms: updatedRooms };
        }
        return suggest;
      });
      return updatedSuggests;
    });
  };

  const isDeleteHandler = (id) => {
    setSuggests((prevSuggests) =>
      prevSuggests.map((item) =>
        item.id === id ? { ...item, isDelete: !item.isDelete } : item
      )
    );
  };

  const deleteHandler = (id) => {
    setSuggests((prevSuggests) =>
      prevSuggests.filter((item) => item.id !== id)
    );
  };

  const gustDeleteRoom = (suggestId, roomId) => {
    // Find the correct suggests object
    const updatedSuggests = suggests.map((suggest) => {
      if (suggest.id === suggestId) {
        // Filter out the room with the specified roomId
        const updatedRooms = suggest.rooms.filter((room) => room.id !== roomId);
        // Create a new suggests object with the updated rooms array
        return { ...suggest, rooms: updatedRooms };
      }
      return suggest; // Return unchanged suggests objects
    });

    // Update the state with the updated suggests array
    setSuggests(updatedSuggests);
  };

  const final=useRef();
  const [finali, setFinali] = useState(0);
  const handleChange = (e) => {
    console.log(e.target.value)
    // Remove the € symbol if present in the input
    // const newValue = e.target.value.replace("€", "");
    // setFinali(newValue);
    setFinali(e.target.value);
  };
  return (
    <>
    <div style={{padding: '0 32px 0 32px'}}>
          <div
            onClick={(e) => {
              console.log("Clicked ");
              if (final.current && !final.current.contains(e.target))
                setIsSuggest(!isSuggest);
            }}
            className={`details-hotel-body ${(isSuggest && "hide") || ""}`}
            style={{backgroundColor : className=="green"? "#EBFAEF":"#E6EFF7",borderRadius:"10px",border:`1px solid ${className=="green"? "#EBFAEF":"#E6EFF7"}`}}
          >
            <div className="details-hotel-body-top">
              <div className="left">
                <div className="icon" style={{backgroundColor : className=="green"? "#34C759":""}}>
                  <HiLocationMarker />
                </div>
                <div className="info">
                  <h4>
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "60%" }}>
                    {currentBooking?.dates[0].actualName}
                  </div>

                   <div>
                   {currentBooking && (<span style={{ display: "flex", width: "100%", whiteSpace: "nowrap",padding: "0 0",backgroundColor : className=="green"? "#34C759":"" }}>
                      {`${currentBooking?.tipi[0]} ${currentBooking?.tipi[0] === 1 ? "Adulto," : "Adulti,"} ${currentBooking?.tipi[10]} ${currentBooking?.tipi[10] == 1 ? "Bambino" : "Bambini"}`}
                    </span>)}
                   </div>
                  </h4>
                  <p>{currentBooking?.guestDetails.length} Stanz{currentBooking?.guestDetails.length==1?"a":"e"}</p>
                </div>
              </div>
              <div className="right">
                <label htmlFor="price" style={{color : className=="green"? "#34C759":""}}>Preventivo Finale</label>
                <div className="right-input" onClick={(e)=>e.stopPropagation()}>
                  <input
                    ref={final}
                    id="peice"
                    type="text"
                    value={finali}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="details-hotel-body-bottom">
              <button onClick={() => {}} style={{ opacity: 0.4 ,backgroundColor : className=="green"? "#34C759":"#B8D2E8", width:"100%"}}>
              <div style={{ opacity: 0 ,backgroundColor : className=="green"? "#34C759":"#B8D2E8"}}>.</div>
              </button>
            </div>
          </div>
        </div>
    <div >
      <div
        className={`details-suggest-body-wrp ${(isSuggest && "show") || ""}`}
      >
        <div className={`details-suggest-body  ${(isSuggest && "show") || ""}`}>
          <SuggestHotel
            data={{
              rooms,
              typeAdult,
              typeChild,
              addGustHandler,
              addHotelHandler,
              setIsSuggest,
              delete: false,
              // setIsDelete,
              isDelete:false,
              deleteRoom,
              currentBooking,
              className,
              final
              
            }}
          />
        </div>
      </div>
      <>
        {/* <PopupTitle title="Suggested Hotels" />
        {suggests.map((s, i) => (
          <div key={i} className={`details-suggest-body-wrp show`}>
            <div className={`details-suggest-body show`}>
              <SuggestHotel
                data={{
                  rooms: s.rooms,
                  addGustHandler: (e) => addGuestToRoom(s.id, e),
                  addHotelHandler: () => addDataToRooms(s.id),
                  delete: true,
                  isDelete: s.isDelete,
                  setIsDelete: () => isDeleteHandler(s.id),
                  setIsSuggest: () => deleteHandler(s.id),
                  deleteRoom: (e) => gustDeleteRoom(s.id, e),
                }}
              />
            </div>
          </div>
        ))} */}
      </>

      {/* <div className="addMoreBtn">
        <button onClick={addMoreHandler}>
          <AiOutlinePlus /> Add more suggest hotels
        </button>
      </div> */}
    </div>
    </>
  );
}