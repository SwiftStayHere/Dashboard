import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiSearch, BiSolidOffer } from "react-icons/bi";
import { FaAngleUp } from "react-icons/fa";
import { ImGlass } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { RiHotelFill } from "react-icons/ri";
import values from "../../../values";
import Description from "../hotel/Description";
import OfferTags from "../hotel/OfferTags";

export default function ImportTemplate({
  handler,
  addhotel,
  tempLoad,
  setDates,
  dates,
}) {
  const ref = useRef(null);
  const wrp = useRef(null);

  const formatDateToItalian = (dateString) => {
    const months = [
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

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} `;
  };

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
        setIsOffer(false);
      }
    });
  });

  const [items, setItems] = useState([]);
  const [itemsMain, setItemsMain] = useState([]);

  const [isOffer, setIsOffer] = useState(false);
  const [activeID, setActiveId] = useState([]);
  const [istoggle, setIsToggle] = useState(null);

  useEffect(() => {
    axios.get(`${values.url}/hotel`).then((d) => {
      setItems(d.data);
      setItemsMain(d.data);
    });
  }, [tempLoad]);

  const createHandler = () => {
    const newDates = activeID.map((item, index) => ({
      id: index + dates?.length + Math.random(),
      hotel: isOffer,
      offer: item?._id,
      price: item.price,
    }));
    setDates((prev) => {
      return [...prev, ...newDates];
    });
    handler(false);
    setIsOffer(false);
    setActiveId([]);
  };
  const [serchData, setSearchData] = useState("");

  useEffect(() => {
    if (!isOffer) {
      if (serchData) {
        const filteredData = itemsMain.filter((item) =>
          item.name.toLowerCase().includes(serchData.toLowerCase())
        );
        setItems(filteredData);
      } else {
        setItems(itemsMain);
      }
    }
  }, [serchData]);

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-template ${
        isOffer && "offer"
      }`}
    >
      <div ref={ref} className="add-hotel-inner erweiuriowuerweriow">
        <div className="add-hotel-top">
          <span>{(isOffer && <BiSolidOffer />) || <RiHotelFill />}</span>
          <button
            onClick={() => {
              handler(false);
              setIsOffer(false);
            }}
            className="close"
          >
            <IoClose />
          </button>
        </div>

        <div className="add-hotel-body">
          <h4>{(isOffer && "Seleziona Offerte") || "Seleziona Hotel"}</h4>
          <p>
            {(isOffer &&
              "Seleziona una o più offerte da cui vuoi importare le date") ||
              " Seleziona l'hotel da cui vuoi importare le offerte e le relative date"}
          </p>
          <div className="module-template-search">
            <label htmlFor="search">
              <BiSearch />
            </label>
            <input
              value={serchData}
              onChange={(e) => {
                setSearchData(e.target.value);
              }}
              type="text"
              placeholder="Cerca"
              id="search"
            />
          </div>
          <div
            className={`module-template-items max ${(isOffer && "hide") || ""}`}
          >
            <div className="left">
              {items.map((item, i) => (
                <>
                  {(item?.offers?.length && (
                    <div
                      key={i}
                      className={`item`}
                      onClick={() => {
                        {
                          item?.offers?.length && setIsOffer(item);
                          item?.offers?.length && setSearchData("");
                        }
                      }}
                    >
                      <RiHotelFill />
                      <div className="content">
                        <h4>{item.name}</h4>
                        <p>
                          {(item?.offers?.length &&
                            ((item?.offers?.length === 1 && "1 Offerta") ||
                              `${item?.offers?.length} Offerte`)) ||
                            "none"}
                        </p>
                      </div>
                    </div>
                  )) ||
                    ""}
                </>
              ))}
            </div>

            <div className="right">
              {isOffer &&
                isOffer?.offers
                  ?.filter((item) =>
                    item.name.toLowerCase().includes(serchData.toLowerCase())
                  )
                  .map((item, i) => (
                    <div
                      key={i}
                      className={`item ${
                        (activeID.some((obj) => obj._id === item._id) &&
                          "active") ||
                        ""
                      }`}
                      onClick={() => {
                        setActiveId((prevActiveId) => {
                          if (!Array.isArray(prevActiveId)) {
                            return [item]; // If it's not an array, initialize it with the new item
                          }

                          const itemIndex = prevActiveId.findIndex(
                            (obj) => obj._id === item._id
                          );

                          if (itemIndex !== -1) {
                            return prevActiveId.filter(
                              (obj) => obj._id !== item._id
                            ); // Remove item if it exists
                          } else {
                            return [...prevActiveId, item]; // Add item if it doesn't exist
                          }
                        });
                      }}
                    >
                      <div className="body">
                        <div className="sjdcafcxvbbnvflkj">
                          <BiSolidOffer />
                          <div className="content">
                            <h4>{item.name}</h4>
                            <p>
                              Dal {formatDateToItalian(item?.startDate)} al{" "}
                              {formatDateToItalian(item?.endDate)}
                            </p>
                          </div>
                        </div>

                        {(!(istoggle === item.id) && (
                          <button
                            onClick={() => {
                              setIsToggle(item.id);
                              setActiveId(null);
                            }}
                            className="btn btn-white"
                          >
                            Vedi Dettagli
                          </button>
                        )) || (
                          <button
                            onClick={() => setIsToggle(null)}
                            className="close"
                          >
                            <FaAngleUp />
                          </button>
                        )}
                      </div>

                      <div
                        className={`offer-item-body ${
                          (istoggle === item.id && "show") || ""
                        }`}
                      >
                        <Description description={item?.description} max={20} />
                        <div className="conditions">
                          <h4>Condizioni</h4>
                          <ul className="conditions-wrp">
                            <li>
                              &#x2713;
                              {(item?.minStay === 1 && "Minimo 1 Notte") ||
                                `Minimo ${item?.minStay} Notti`}
                            </li>
                            <li>
                              &#x2713;
                              {(item?.maxStay === 1 && "Massimo 1 Notte") ||
                                `Massimo ${item?.maxStay} Notti`}{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="conditions">
                          <h4>
                            <ImGlass />
                            Bevande Incluse
                          </h4>
                        </div>

                        <div className="price">
                          <h4>Prezzi</h4>
                          <ul className="price-items">
                            {item?.breakdown?.map((d, i) => (
                              <li key={i}>
                                <p>{d.name}</p>
                                <strong>
                                  {d?.currency}
                                  {d?.price} <span>/{d?.priceType}</span>
                                </strong>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="offer-item-tags">
                          <h4>Tags</h4>
                          <OfferTags ta={item?.tags} isTagEdit={false} />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {isOffer && (
          <div className="add-hotel-footer">
            <button
              onClick={() => {
                setIsOffer(false);
                setIsToggle(null);
                setSearchData("");
              }}
              className="btn cancel"
            >
              Indietro
            </button>
            <button onClick={createHandler} className="btn">
              Seleziona
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
