import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import Loading from "../basic/Loading";
import TransportItem from "./TransportItem";

export default function TransportBody({
  handler,
  search,
  setTransportData,
  activePage,
  setMaxValue,
  activeMenu,
  sortValue,
  filterOP,
  setIsDup,
  isloading,
  setIsLoading,
}) {
  const [transport, setTransport] = useState([]);
  const [transportMain, setTransportMain] = useState([]);
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    setIsLoading(true);
    const encodedSearchTerm = encodeURIComponent(search);
    axios
      .get(
        `${values.url}/transport?page=${
          activePage || 1
        }&search=${encodedSearchTerm}`,
        {
          headers: {
            token,
          },
        }
      )
      .then((d) => {
        setTransport(d.data.result);
        console.log(d.data);
        setTransportMain(d.data.result);
        setMaxValue(d.data.count);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.response);
      });
  }, [activePage, search]);

  //search

  // useEffect(() => {
  //   if (search) {
  //     const filteredTransport = transportMain.filter((item) => {
  //       const searchValue = search?.toLowerCase().replace(/\$/, "").trim();

  //       if (search[0] === "$") {
  //         return item?.vehicleType.toLowerCase().includes(searchValue);
  //       }

  //       return (
  //         item?.name.toLowerCase().includes(searchValue) ||
  //         item?.city.toLowerCase().includes(searchValue) ||
  //         item?.state.toLowerCase().includes(searchValue)
  //       );
  //     });

  //     // Update state with filtered results
  //     setTransport(filteredTransport);
  //   } else {
  //     setTransport(transportMain);
  //   }
  // }, [search]);

  useEffect(() => {
    if (sortValue === "Ordina per i più vecchi") {
      const sortedTransport = [...transport].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateA - dateB;
      });

      setTransport(sortedTransport);
    } else {
      const sortedTransport = [...transport].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });

      setTransport(sortedTransport);
    }
  }, [sortValue]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // filter

  useEffect(() => {
    if (filterOP.car.length || filterOP.days.length) {
      const filteredTransport = transportMain.filter((item) => {
        const isCarIncluded = filterOP.car.includes(item.vehicleType);
        const areDaysIncluded = item.days.some((day) =>
          filterOP.days.includes(day)
        );
        return isCarIncluded || areDaysIncluded;
      });

      setTransport(filteredTransport);
    } else {
      setTransport(transportMain);
    }
  }, [filterOP]);

  // active menu

  useEffect(() => {
    if (activeMenu === "Scaduti") {
      const currentDate = new Date(); // Get current date

      const filteredTransportMain = transportMain.filter((item) => {
        const itemEndDate = new Date(item.endingDate); // Assuming endDate is a property in each object

        // Compare item's end date with current date
        return itemEndDate.getTime() < currentDate.getTime();
      });

      setTransport(filteredTransportMain);
    } else {
      setTransport(transportMain);
    }
  }, [activeMenu, transportMain]);

  return (
    <div className="transport-body">
      {(activeMenu === "Tutti" &&
        !isloading &&
        transport &&
        transport.length &&
        transport.map((item) => (
          <TransportItem
            setTransportData={setTransportData}
            key={item._id}
            data={item}
            handler={handler}
            setIsDup={setIsDup}
          />
        ))) ||
        (!isloading &&
          transport &&
          transport.length &&
          transport
            .filter((item) => new Date(item.createdAt) > oneWeekAgo)
            .map((item) => (
              <TransportItem
                setTransportData={setTransportData}
                key={item._id}
                data={item}
                handler={handler}
              />
            ))) ||
        (isloading && <Loading />)}
    </div>
  );
}
