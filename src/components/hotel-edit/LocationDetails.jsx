import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import Select from "../basic/Select";
import Map from "../hotel/Map";
import EditableSelectCity from "./EditableSelectCity";
import Input from "./Input";
import LocationDistances from "./LocationDistances";

const cities = [
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
];

export const extractLatAndLng = (inputString) => {
  if (typeof inputString !== "string") return null;
  const parts = inputString.split(",");
  if (parts.length !== 2) return null;

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  if (isNaN(lat) || isNaN(lng)) return null;

  return { lat, lng };
};

export default function LocationDetails({ data, setData, fixtData }) {
  useEffect(() => {
    if (!data?.distance || !!data.distance.length)
      setData((prev) => {
        return {
          ...prev,
          distance: [
            {
              id: 1 + Math.random(),
              isEdit: false,
              label: "Distanza dal Centro",
              distance: 0,
              scale: "Mt",
            },
            {
              id: 2 + Math.random(),
              isEdit: false,
              label: "Distanza dal Mare",
              distance: 0,
              scale: "Mt",
            },

            {
              id: 3 + Math.random(),
              isEdit: false,
              label: "Distanza dalle Terme",
              distance: 0,
              scale: "Mt",
            },
          ],
        };
      });
  }, []);

  const [lat, setLat] = useState(40.72910996068338);
  const [lng, setLng] = useState(13.907388130851295);
  const [mapMarker, setMapMarker] = useState({
    lat: 40.72910996068338,
    lng: 13.907388130851295,
  });

  useEffect(() => {
    if (data?.coordinate) {
      const { lat: funcLat, lng: funcLng } = extractLatAndLng(data.coordinate);
      // setMapMarker({lat, lng})
      setLat(funcLat);
      setLng(funcLng);
    }
  }, [data]);

  // valid postale code
  const [isValid, setIsValid] = useState(true);
  // const postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;

  // const [isRemove, setIsRemove] = useState(false);

  // const toggleEdit = (itemId) => {
  //   const updatedDestinces = destinces.map((item) => {
  //     if (item.id === itemId) {
  //       return { ...item, isEdit: !item.isEdit };
  //     }
  //     return item;
  //   });
  //   setDestinces(updatedDestinces);
  // };

  // const handleChangeLabel = (itemId, newLabel) => {
  //   const updatedDestinces = destinces.map((item) => {
  //     if (item.id === itemId) {
  //       return { ...item, label: newLabel, isEdit: false };
  //     }
  //     return item;
  //   });
  //   setDestinces(updatedDestinces);
  // };

  return (
    <div className="location-details">
      <h4>Location</h4>
      <p>
        Enter the location information and finally copy the coordinates from Google Maps and paste them into “Google Maps Coordinates”
      </p>
      <div className="inputs">
        <div className="inputs-item">
          <label htmlFor="">Region</label>
          <Select
            activeValue={data?.city || "Select Region"}
            handler={(e) => {
              // setIsChange(true);
              setData((prev) => {
                return {
                  ...prev,
                  city: e,
                  state: "",
                  zip: "",
                };
              });
            }}
            data={cities}
          />
        </div>
        <div className="inputs-item">
          <label htmlFor="">Città</label>
          {/* <Select data={["Select City", "Select City", "Select City"]} /> */}
          <EditableSelectCity
            hotel={true}
            activeValue={data?.state || "Select City"}
            mainData={data}
            handler={(e) => {
              // setIsChange(true);
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
        {/* <div className="inputs-item">
          <label htmlFor="">Codice Postale</label>
          <Input
            d={{ value: data?.zip, label: "Inserisci codice postale" }}
            handler={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  zip: e,
                };
              });
            }}
          />
        </div>
      </div> */}
        <div className={`form-group ${(!isValid && "error") || ""}`}>
          <label htmlFor="">Codice Postale</label>
          <Input
            d={{ value: data?.zip, label: "Postal Code" }}
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
      <div className="inputs">
        <div className="inputs-item">
          <label htmlFor="">Address</label>
          <Input
            d={{
              value: data?.address,
              label: "Enter the hotel address",
            }}
            handler={(e) => {
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
      <div className="inputs ">
        <div className="inputs-item location">
          <label htmlFor="">Coordinate Google Map</label>
          <Input
            d={{
              value: data?.coordinate,
              label: "Enter coordinates (example: 40.723, 13.903)",
            }}
            handler={(e) => {
              setData((prev) => {
                if (!extractLatAndLng(e)) {
                  return prev;
                }
                return {
                  ...prev,
                  coordinate: e,
                };
              });
            }}
          />
          <span>
            <MdLocationOn />
          </span>
        </div>
      </div>
      {/* <Map markerPosition={extractLatAndLng(data.coordinate) ?? mapMarker} /> */}
      {/* <Map markerPosition={mapMarker} /> */}
      {/* <Map markerPosition={{lat, lng}} /> */}
      <Map lat={lat} lng={lng} markerPosition={mapMarker} />
      {/* <div className="location-details-bottom">
        <h4>Distanza</h4>
        <p>Inserisci le distanze dai vari posti</p>

        <div className="destince">
          {!!data.distance.length &&
            data.distance.map((d, i) => (
              <div key={i} className="destince-item">
                <div className="destince-item-top">
                  <span>{d.label}</span>
                  <EditTitle
                    closeHandler={(e) => toggleEdit(d.id)}
                    changeHandler={(e) => handleChangeLabel(d.id, e)}
                    isShow={d.isEdit}
                    data={d.label}
                  />
                  <button onClick={() => toggleEdit(d.id)}>
                    <FiEdit />
                  </button>
                </div>
                <div className="destince-item-body">
                  <Select
                    data={["Mt", "Km"]}
                    activeValue={d.scale}
                    handler={(e) => {
                      setData((prev) => {
                        return {
                          ...prev,
                          city: e,
                        };
                      });
                    }}
                  />
                  <Input d={{ value: d.distance, label: "" }} />
                </div>
              </div>
            ))}
          <button
            onClick={() => {
              // setDestinces((prev) => {
              //   return [
              //     ...prev,
              //     {
              //       label: "distance from center",
              //       value: 30,
              //       scale: "Mt",
              //     },
              //   ];
              // });
            }}
          >
            <AiOutlinePlus /> Add more
          </button>
        </div>
      </div> */}
      <LocationDistances fixtData={fixtData} data={data} setData={setData} />
    </div>
  );
}
