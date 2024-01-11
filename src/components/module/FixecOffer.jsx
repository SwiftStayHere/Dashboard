import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";
import EditableSelectCity from "../transport/EditableSelectCity";
import CreateDateTemplete from "./CreateDateTemplete";
import CreateRegionTemplete from "./CreateRegionTemplete";
import DateList from "./DateList";
import ImportTemplate from "./ImportTemplate";
import RegionTemplate from "./RegionTemplete";

export default function FixedOffer({
  data,
  setData,
  fixtData,
  tempLoad,
  setTempLoad,
}) {
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

  const [dates, setDates] = useState([{ start: "", end: "", id: 1, price: 0 }]);
  const [carrency, setCarrency] = useState("€");

  const handleDateChange = (id, newValue) => {
    const updatedDates = [...dates];
    const dateIndex = updatedDates.findIndex((date) => date.id === id);

    if (dateIndex !== -1) {
      updatedDates[dateIndex].price =
        (rx.test(newValue.toString()) && newValue) ||
        (newValue.length < 2 ? 0 : updatedDates[dateIndex].price);
      setDates(updatedDates);
    }
  };

  const addNewDate = () => {
    const newDate = {
      id: dates.length + 1 + Math.random(),
      value: "",
    };

    // Add the new date item to the existing array
    setDates([...dates, newDate]);
  };

  const deleteDate = (id) => {
    // Create a copy of the dates state and filter out the item with the specified id
    const updatedDates = dates.filter((date) => date.id !== id);

    // Set the updated state without the deleted item
    setDates(updatedDates);
  };

  const [region, setRegion] = useState([]);
  const handleRegionChange = (id, newValue) => {
    // Create a copy of the dates state
    const updatedDates = [...region];

    // Find the index of the date with the specified ID
    const dateIndex = updatedDates.findIndex((date) => date.id === id);

    // Update the value of the specified date
    if (dateIndex !== -1) {
      updatedDates[dateIndex].price =
        (rx.test(newValue.toString()) && newValue) ||
        (newValue.length < 2 ? 0 : updatedDates[dateIndex].price);
      setRegion(updatedDates);
    }
  };

  const addNewRegion = () => {
    // Create a new date object with initial values
    const newDate = {
      id: region.length + 1, // Generate a unique ID (you can use a different approach for unique IDs)
      value: "",
    };

    // Add the new date item to the existing array
    setRegion([...region, newDate]);
  };

  const deleteRegion = (id) => {
    // Create a copy of the dates state and filter out the item with the specified id
    const updatedDates = region.filter((date) => date.id !== id);

    // Set the updated state without the deleted item
    setRegion(updatedDates);
  };

  const [isImport, setIsImport] = useState(false);
  const [isDate, setIsDate] = useState(false);

  // create templete
  const [isCr, setIsCr] = useState(false);
  const [isRr, setIsRr] = useState(false);
  const rx = /^(\d+(\.\d{0,2})?)?$/;

  useEffect(() => {
    setRegion(fixtData?.fixtRegion || []);
    setDates(fixtData?.fiexDate || []);
  }, [fixtData]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        fiexDate: dates,
      };
    });
  }, [dates]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        fixtRegion: region,
      };
    });
  }, [region]);

  const [isRT, setIsRT] = useState(false);

  return (
    <div className="module-edit-basic fixed-offer">
      <ImportTemplate
        tempLoad={tempLoad}
        addhotel={isImport}
        handler={setIsImport}
        setDates={setDates}
        dates={dates}
      />
      <DateList
        setDates={setDates}
        addhotel={isDate}
        handler={setIsDate}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
      />
      <h4>Offerte Fisse</h4>
      <p>
        Aggiungi le date e le città che possono selezionare gli utenti nel
        modulo, e se possibile, importa le offerte dall'hotel poiché potranno
        essere calcolate automaticamente
      </p>
      <div className="fixed-offer-item">
        <div className="fixed-offer-item-top">
          <strong>Date</strong>
          <div className="buttons">
            <button onClick={() => setIsCr(true)}>Crea Template </button>
            <span className="separator"></span>
            <button onClick={() => setIsImport(true)}>Importa Offerte </button>
            <span className="separator"></span>
            <button onClick={() => setIsDate(true)}>Importa lista Date </button>
          </div>
        </div>
        {dates.map((date, i) => (
          <>
            <div key={i} className="fixed-offer-item-body">
              <div className="group">
                <label htmlFor="">Data d’inizio</label>
                <input
                  disabled={date?.hotel}
                  value={
                    date.hotel
                      ? new Date(
                          date?.hotel?.offers?.find(
                            (item) => item._id === date?.offer
                          )?.startDate
                        )
                          .toISOString()
                          .split("T")[0] || ""
                      : date?.start || ""
                  }
                  max={date?.end || ""}
                  onChange={(e) => {
                    if (!date.hotel) {
                      setDates((prevDates) => {
                        const updatedDates = [...prevDates];
                        updatedDates[i].start = e.target.value;
                        return updatedDates;
                      });
                    }
                  }}
                  type="date"
                  name=""
                  id=""
                />
              </div>
              <div className="group">
                <label htmlFor="">Data finale</label>
                <input
                  disabled={date?.hotel}
                  min={date?.start || ""}
                  value={
                    date.hotel
                      ? new Date(
                          date?.hotel?.offers?.find(
                            (item) => item._id === date?.offer
                          )?.endDate
                        )
                          .toISOString()
                          .split("T")[0] || ""
                      : date?.end || ""
                  }
                  type="date"
                  name=""
                  onChange={(e) => {
                    setDates((prevDates) => {
                      const updatedDates = [...prevDates];
                      updatedDates[i].end = e.target.value;
                      return updatedDates;
                    });
                  }}
                  id=""
                />
              </div>
              <div className="group">
                <label htmlFor="">Prezzo Iniziale</label>
                <div className="inner">
                  <Select
                    activeValue={carrency}
                    handler={(e) => setCarrency(e)}
                    data={["€", "$"]}
                  />
                  <Input
                    d={{ value: date?.price || 0, label: "Enter Price" }}
                    handler={(e) => handleDateChange(date.id, e)}
                  />
                </div>
              </div>
              <button onClick={() => deleteDate(date.id)}>
                <AiOutlineDelete />
              </button>
            </div>

            {date?.hotel?.name && (
              <div className="info">
                {date?.hotel?.name && (
                  <span
                    style={{
                      color: "#015DAA",
                    }}
                  >
                    {date?.hotel?.name}
                  </span>
                )}{" "}
                -{" "}
                {date?.hotel.name && (
                  <span
                    style={{
                      color: "#1DBF73",
                    }}
                  >
                    {date?.hotel?.offers?.map((item) => {
                      return item._id === date?.offer && item?.name;
                    })}
                  </span>
                )}
              </div>
            )}
          </>
        ))}
        <button onClick={addNewDate}>
          <AiOutlinePlus /> Aggiungi
        </button>
      </div>

      <CreateDateTemplete
        handler={setIsCr}
        addhotel={isCr}
        setData={setData}
        data={data}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
        dates={dates}
        carrency={carrency}
      />

      <CreateRegionTemplete
        handler={setIsRr}
        addhotel={isRr}
        setData={setRegion}
        data={data}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
        dates={region}
        carrency={carrency}
      />

      {/* region part */}
      <div className="fixed-offer-item">
        <div className="fixed-offer-item-top">
          <strong>Città</strong>
          <div className="buttons">
            <button onClick={() => setIsRr(true)}>Crea Template </button>
            <span className="separator"></span>
            <button
              onClick={() => {
                setIsRT(true);
                setTempLoad(!tempLoad);
              }}
            >
              Importa lista Città
            </button>
          </div>
        </div>
        {region &&
          region?.map((date, i) => (
            <div key={i} className="fixed-offer-item-body">
              <div className="group">
                <label htmlFor="">Regione</label>
                <Select
                  activeValue={date?.region || "Seleziona Regione"}
                  handler={(e) => {
                    setRegion((prevDates) => {
                      const updatedDates = [...prevDates];
                      updatedDates[i].region = e;
                      updatedDates[i].city = "";
                      return updatedDates;
                    });
                  }}
                  data={citysName}
                />
              </div>
              <div className="group">
                <label htmlFor="">Città</label>
                <EditableSelectCity
                  activeValue={date?.city || "Seleziona Città"}
                  mainData={{ city: date?.region }}
                  handler={(e) => {
                    setRegion((prevDates) => {
                      const updatedDates = [...prevDates];
                      updatedDates[i].city = e.name;
                      return updatedDates;
                    });
                  }}
                />
              </div>
              <div className="group">
                <label htmlFor="">Prezzo Iniziale</label>
                <div className="inner">
                  <Select
                    activeValue={carrency}
                    handler={(e) => setCarrency(e)}
                    data={["€", "$"]}
                  />
                  <Input
                    d={{ value: date?.price || 0, label: "Enter Price" }}
                    handler={(e) => handleRegionChange(date.id, e)}
                  />
                </div>
              </div>
              <button onClick={() => deleteRegion(date.id)}>
                <AiOutlineDelete />
              </button>
            </div>
          ))}
        <button onClick={addNewRegion}>
          <AiOutlinePlus /> Aggiungi
        </button>
      </div>

      <RegionTemplate
        addhotel={isRT}
        setData={setRegion}
        handler={setIsRT}
        tempLoad={tempLoad}
        setTempLoad={setTempLoad}
      />
    </div>
  );
}
