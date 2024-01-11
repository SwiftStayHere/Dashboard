import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsFillBuildingsFill, BsPlusLg } from "react-icons/bs";
import { GiSightDisabled } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import values from "../../../values";
import Bootcump from "../basic/BootCump";
import Loading from "../basic/Loading";
import Rating from "../basic/Rating";
import Search from "../basic/Search";
import Title from "../basic/Title";
import AddNewOffer from "../hotel-edit/AddNewOffer";
import { extractLatAndLng } from "../hotel-edit/LocationDetails";
import AgeEdit from "../hotel/AgeEdit";
import DeleteHotel from "../hotel/DeleteHotel";
import Description from "../hotel/Description";
import EditBtn from "../hotel/EditBtn";
import HotelDetailsImg from "../hotel/HoteldetailsImg";
import Map from "../hotel/Map";
import OfferItem from "../hotel/OfferItem";
import Tags from "../hotel/Tags";

export default function HotelDetails() {
  const [hotelData, setHotelData] = useState(null);

  const { id: hotelId } = useParams();
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${values.url}/hotel/single/${hotelId}`,
          {
            headers: {
              token,
            },
          }
        );

        setHotelData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [ofSer, setOfSer] = useState("");

  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const deleteChange = async () => {
    try {
      const resp = await axios.delete(`${values.url}/hotel/${hotelId}`, {
        headers: {
          token,
        },
      });

      navigate("/hotel");
    } catch (error) {
      console.log(error);
    }
  };

  const [bootcumpData, setBootcupmData] = useState([
    {
      name: "",
      url: "/hotel",
      icon: <BsFillBuildingsFill />,
    },
    {
      name: "San Pietro di Positano",
    },
  ]);

  useEffect(() => {
    setBootcupmData([
      {
        name: "Richieste Preventivo",
        url: "/hotel",
        icon: <BsFillBuildingsFill />,
      },
      {
        name: hotelData?.name,
      },
    ]);
  }, [hotelData]);

  if (!hotelData) return <Loading />;
  return (
    <div className="hotel hotel-details">
      <div className="container">
        <Bootcump data={bootcumpData} />
        <div className="hotel-details-wrp">
          <div className="basic">
            <div className="booking-box">
              <div className="hotel-details-top">
                <HotelDetailsImg imgs={hotelData && hotelData.images} />
                <div className="info">
                  <div className="left">
                    <Title title={hotelData && hotelData.name} />
                    {hotelData?.disabled && (
                      <strong
                        style={{
                          color: "#ff9500",
                        }}
                      >
                        ( Disabilitato)
                      </strong>
                    )}
                    <Rating />
                  </div>
                  <EditBtn hotelId={hotelId} />
                </div>
                <Tags tag={[...hotelData.services, ...hotelData.strengths]} />
              </div>
              <div className="hotel-details-des">
                {hotelData.summaryDescription && (
                  <Description
                    description={hotelData.summaryDescription}
                    title="Riassunto Descrizione"
                  />
                )}{" "}
                {hotelData.hotelDescription && (
                  <Description
                    description={hotelData.hotelDescription}
                    title="Descrizione Hotel"
                  />
                )}
              </div>
            </div>
            <div className="booking-box hotel-details-service">
              <div className="hotel-details-service-top">
                <h4>Servizi</h4>
                <EditBtn hotelId={hotelId} />
              </div>
              <div className="hotel-details-service-body">
                {/* <ul className="hotel-details-service-body-items">
                  {[...hotelData.services, ...hotelData.strengths].map(
                    (item, i) => (
                      <li key={i}>
                      
                        {item}
                      </li>
                    )
                  )}
                </ul> */}
                <div className="hotel-details-des">
                  {hotelData.serviceDetails && (
                    <Description
                      max={30}
                      description={hotelData.serviceDetails}
                      title="Dettagli Servizi"
                    />
                  )}
                  {hotelData.roomsDescription && (
                    <Description
                      max={30}
                      description={hotelData.roomsDescription}
                      title={hotelData?.roomsTitle}
                    />
                  )}
                  {hotelData.spaDescription && (
                    <Description
                      max={30}
                      description={hotelData.spaDescription}
                      title={hotelData?.spaTitle}
                    />
                  )}{" "}
                  {hotelData.restaurantDescription && (
                    <Description
                      max={30}
                      description={hotelData.restaurantDescription}
                      title={hotelData?.restaurantTitle}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="booking-box hotel-details-location">
              <div className="hotel-details-location-top">
                <h4>Location</h4>
                <EditBtn hotelId={hotelId} />
              </div>
              <Map markerPosition={extractLatAndLng(hotelData.coordinate)} />
            </div>

            {(hotelData?.ageDeductions && hotelData?.ageDeductions?.length && (
              <div className="booking-box hotel-details-service">
                <div className="hotel-details-service-top">
                  <h4>Riduzioni Età</h4>
                  <div className="edit-btn">
                    {/* <button
                    className={isEdit && "save"}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    {(!isEdit && (
                      <>
                        <LuEdit /> Edit
                      </>
                    )) ||
                      "Save"}
                  </button> */}
                    <EditBtn hotelId={hotelId} />
                  </div>
                </div>
                <AgeEdit isEdit={isEdit} />
              </div>
            )) ||
              ""}
          </div>
          <div className="hotel-details-right basic">
            <div className="booking-box delete-disable">
              <div className="delete-disable-top">
                <h4>
                  {(hotelData?.disabled && "Disabilita o Elimina") ||
                    "Riabilita o Elimina"}
                </h4>
              </div>
              <div className="delete-disable-body">
                <DeleteHotel
                  data={hotelData.name}
                  publish={hotelData?.disabled || false}
                  isShow={isDelete}
                  closeHandler={() => setIsDelete(false)}
                  changeHandler={deleteChange}
                  hotelData={hotelData}
                />
                <button onClick={() => setIsDelete("disable")} className="btn">
                  {(hotelData?.disabled && <GiSightDisabled />) || (
                    <AiFillEyeInvisible />
                  )}
                  {(!hotelData?.disabled && "Disabilita") || "Riabilita"}
                </button>
                <button
                  onClick={() => setIsDelete("delete")}
                  className="btn delete"
                >
                  <RiDeleteBin2Line /> Elimina
                </button>
              </div>
            </div>
            <div className="booking-box hotel-details-offers">
              <AddNewOffer
                isAdd={isAdd}
                setIsAdd={setIsAdd}
                submitHandler={() => setIsAdd(false)}
              />
              <div className="hotel-details-offers-top">
                <Title title="Offerte Hotel" />
                <button onClick={() => setIsAdd(true)} className="add-new">
                  <BsPlusLg />
                </button>
              </div>
              <Search search={ofSer} setSearch={setOfSer} pls="Cerca Offerta" />
              {hotelData.offers && (
                <div className="hotel-details-offers-body">
                  {hotelData.offers
                    .filter((offer) =>
                      offer?.name?.toLowerCase()?.includes(ofSer?.toLowerCase())
                    )
                    .map((offer, i) => (
                      <OfferItem
                        key={i}
                        editOfferHandler={setIsAdd}
                        offer={offer}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
