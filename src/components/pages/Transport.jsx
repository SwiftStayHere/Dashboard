import { useState } from "react";
import Button from "../basic/Button";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddTransport from "../transport/AddTransport";
import TransportBody from "../transport/TransportBody";

export default function Transport() {
  const menus = [
    { name: "Tutti" },
    { name: "Recentemente Aggiunti" },
    { name: "Scaduti" },
  ];
  const [transportData, setTransportData] = useState({});
  const [addTransport, setAddTransport] = useState(false);
  const [add, isAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [isDup, setIsDup] = useState(false);

  const [maxVlaue, setMaxValue] = useState(0);
  const [activeVlaue, setActiveValue] = useState();
  const [activeMenu, setActiveMenu] = useState(false);
  const [sortValue, setSortValue] = useState("Sort by last added");
  const [filterOP, setFilterOP] = useState({
    car: [],
    days: [],
  });
  const [isloading, setIsLoading] = useState(false);

  return (
    <div className="module hotel transport">
      <AddTransport
        add={add}
        handler={setAddTransport}
        addhotel={addTransport}
        transportData={(!add && transportData) || null}
        isDup={isDup}
      />
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Transport List" />
              <p>
                This is the list of all transports added in the panel
              </p>
            </div>
            <div className="hotel-top-right">
              {/* <ExportBtn /> */}
              <Button
                handler={(e) => {
                  setAddTransport(e);
                  isAdd(true);
                  setIsDup(false);
                }}
                text="Add Transport"
              />
            </div>
          </div>
          <BookingMneu setActive={setActiveMenu} menus={menus} />
          <Filters
            filterOP={filterOP}
            setFilterOP={setFilterOP}
            sortValue={sortValue}
            setSortValue={setSortValue}
            search={search}
            setSearch={setSearch}
          />
          <TransportBody
            activeMenu={activeMenu}
            search={search}
            setTransportData={setTransportData}
            activePage={activeVlaue}
            setMaxValue={setMaxValue}
            sortValue={sortValue}
            isloading={isloading}
            setIsLoading={setIsLoading}
            handler={(e) => {
              setAddTransport(e);
              isAdd(false);
            }}
            filterOP={filterOP}
            setIsDup={setIsDup}
          />
          <Pagenation
            setIsLoading={setIsLoading}
            isbrns={true}
            active={activeVlaue}
            max={maxVlaue}
            setActiveValue={setActiveValue}
            search={search}
          />
        </div>
      </div>
    </div>
  );
}
