import { useEffect, useRef, useState } from "react";
import values from "../../../values";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import QuoteDetails from "../booking/QuoteDetails";
import Table from "../booking/Table";
import TableUser from "../booking/TableUser";
import UserDetails from "../booking/UserDetails";
import axios from "axios";
import * as XLSX from "xlsx";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
export default function Booking() {
  const [autocomplete, setAutocomplete] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBen1zTUuynCgRfIStX1NqhEp_eHat4n0k',
    libraries: ['places']
  })
  const [activePage, setActivePage] = useState("booking");
  const [isFilter, setIsFilter] = useState(false);
  const filter = useRef(null);
  const [currentUser, setCurrentUser] = useState("");
  const [getuser, setGetuser] = useState(true);
  const [isDetails, setIsDetails] = useState(false);
  const [isIndex, setIsIndex] = useState(null);
  const table = useRef(null);
  const [tempTableData, setTempTableData] = useState([]);
  // const [transpTableData, setTranspTableData] = useState(null);
  const [filterOps, setFilterOP] = useState({
    transport: [],
    modules: [],
  });
  const [filterTogle, setFilterTogle] = useState(true);
  const [sortName, setSortName] = useState("Nessun ordine applicato");
  const [tableData, setTableData] = useState([]);
  const [OriginalData, setOgData] = useState([]);
  const [menus, setMenus] = useState([
    { name: "All" },
    { name: "Recent Requests", request: 5 },
    { name: "To Be Processed" },
    { name: "To Send" },
    { name: "Errors" },
    { name: "CTA Clicked" },
  ]);
  useEffect(() => {
    renderbookingData();
  }, []);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  useEffect(() => {

    if (tableData != undefined) {
      // console.log(filterOps);
      let tempi = filterArrayByTransportAndModule(
        tableData,
        filterOps?.transport,
        filterOps?.modules
      );

      setTempTableData(() => filterFunction(sortName, tempi));
    }
  }, [sortName, filterTogle]);
  const handleRowClick = (userDetails) => {
    setSelectedUserDetails(userDetails);
  };
  async function renderbookingData() {
    await axios
      .get(`${values.url}/booking`)
      .then((response) => {
        // console.log("Table Data",response.data)
        setTableData(response.data);
        setTempTableData(() =>
          filterFunction(
            "Ordina dal più recente al più distante",
            response.data
          )
        );
        setOgData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  //  useEffect(() => {
  //    console.log(currentUser);
  //  }, [currentUser]);
  const genrateExcel = () => {
    let wb = XLSX.utils.book_new();
    // Select the fields you want to keep
    const selectedFields = [
      "id",
      "user",
      "citta",
      "createdAt",
      "module",
      "periodo",
      "tipi",
      "trasporto",
      "user",
    ];

    // Use map to create a new array with selected fields
    const newArray = tempTableData.map((item) => {
      const newItem = {};
      selectedFields.forEach((field) => {
        newItem[field] = item[field];
      });
      return newItem;
    });
    let ws = XLSX.utils.json_to_sheet(newArray);
    XLSX.utils.book_append_sheet(wb, ws, "Mysheet1");
    XLSX.writeFile(wb, "Myfile.xlsx");
  };
  function filterArrayByTransportAndModule(
    array,
    targetTransports,
    targetModules
  ) {
    // console.log(array,targetTransports,targetModules)
    return array.filter((item) => {
      const firstWordOfTransport = (item.trasporto || "")
        .split(" ")[0]
        .toLowerCase();
      // console.log(item)
      let isTransportMatch = true;
      let isModuleMatch = true;
      if (targetTransports?.length > 0) {
        isTransportMatch = targetTransports
          .map((t) => t.toLowerCase())
          .includes(firstWordOfTransport);
      }
      if (targetModules?.length > 0) {
        isModuleMatch = targetModules
          .map((m) => m.toLowerCase())
          .includes((item.module || "").toLowerCase());
      }
      // console.log(isTransportMatch, isModuleMatch);
      return isTransportMatch && isModuleMatch;
    });
  }
  const filterFunction = (value, array) => {
    // let array=[...arrayi]
    if (!Array.isArray(array)) {
      // console.error("Input is not an array:", array);
      return; // or handle the error accordingly
    }
    if (value == "Nessun ordine applicato") {
      return array
    } else if (value == "Ordina dal più recente al più distante") {
      const sortedArray = [...array].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return sortedArray;
    } else if (value == "Ordina dal più distante al più recente") {
      const sortedArray = [...array].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      return sortedArray;
    } else if (
      value ==
      "Mostra prima i preventivi con il nome del cliente in ordine alfabetico (A-Z)"
    ) {
      const sortedArray = [...array].sort((a, b) =>
        a.user.localeCompare(b.user)
      );
      return sortedArray;
    } else if (
      value ==
      "Mostra prima i preventivi con il nome del cliente in ordine alfabetico (Z-A)"
    ) {
      const sortedArray = [...array].sort((a, b) =>
        b.user.localeCompare(a.user)
      );
      return sortedArray;
    } else if (value == "Mostra prima i preventivi con CTA Cliccata") {
      const sortedArray = [...array].sort((a, b) => {
        // First, prioritize items with "status" set to "CTA Cliccata"
        if (a.status === "CTA Cliccata" && b.status !== "CTA Cliccata") {
          return -1;
        }
        if (a.status !== "CTA Cliccata" && b.status === "CTA Cliccata") {
          return 1;
        }

        // If both have the same status or neither has "CTA Cliccata", sort based on the "name" field
        return a.name.localeCompare(b.name);
      });
      return sortedArray;
    } else if (value == "Mostra prima i preventivi To be Processed") {
      const sortedArray = [...array].sort((a, b) => {
        // First, prioritize items with "status" set to "To be Processed"
        if (a.status === "To be Processed" && b.status !== "To be Processed") {
          return -1;
        }
        if (a.status !== "To be Processed" && b.status === "To be Processed") {
          return 1;
        }

        // If both have the same status or neither has "To be Processed", sort based on the "name" field
        return a.name.localeCompare(b.name);
      });
      return sortedArray;
    } else if (value == "Mostra prima i preventivi Da Inviare") {
      const sortedArray = [...array].sort((a, b) => {
        // First, prioritize items with "status" set to "Da Inviare"
        if (a.status === "Da Inviare" && b.status !== "Da Inviare") {
          return -1;
        }
        if (a.status !== "Da Inviare" && b.status === "Da Inviare") {
          return 1;
        }

        // If both have the same status or neither has "Da Inviare", sort based on the "name" field
        return a.name.localeCompare(b.name);
      });
      return sortedArray;
    } else if (value == "Mostra prima i preventivi con Errori") {
      const sortedArray = [...array].sort((a, b) => {
        // First, prioritize items with "status" set to "Errori"
        if (a.status === "Errori" && b.status !== "Errori") {
          return -1;
        }
        if (a.status !== "Errori" && b.status === "Errori") {
          return 1;
        }

        // If both have the same status or neither has "Errori", sort based on the "name" field
        return a.name.localeCompare(b.name);
      });
      return sortedArray;
    } else if (value == "Mostra prima quelli con più preventivi richiesti") {
      const sortedArray = [...array].sort(
        (a, b) => b.guestdetails.length - a.guestdetails.length
      );
      return sortedArray;
    }
  };

  // key up down handler

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      // Arrow up key (move selection up)
      if (isIndex > 0) {
        setIsIndex((prev) => {
          return prev - 1;
        });
      }
    } else if (event.keyCode === 40) {
      // Arrow down key (move selection down)
      if (
        (activePage === "booking" && isIndex < values.requestTD.length - 1) ||
        isIndex < values.userTD.length - 1
      )
        setIsIndex((prev) => {
          return prev + 1;
        });
    }
  };
  const handleSearch = (value) => {
    if (value.trim()) {
      const regexWord = new RegExp(value, "i");

      // Define an array of fields you want to search
      const fieldsToSearch = [
        "citta",
        "module",
        "user",
        "trasporto",
        "periodo",
        "id",
      ];

      // Generate regex patterns for each field
      const regexPatterns = fieldsToSearch.reduce((regexObj, field) => {
        regexObj[field] = new RegExp(value, "i");
        return regexObj;
      }, {});

      const filteredResults = OriginalData.filter((item) => {
        const word = item.user.split(" ");
        let firstWord = word[0];
        let lastWord = word[1];

        // Use dynamic regex tests based on fieldsToSearch
        return fieldsToSearch.some((field) => {
          if (field === "user") {
            return (
              regexPatterns[field].test(firstWord) ||
              regexPatterns[field].test(lastWord)
            );
          }
          return regexPatterns[field].test(item[field]);
        });
      });

      setTempTableData(filteredResults);
    } else {
      renderbookingData();
    }
  };
  useEffect(() => {
    if (isIndex || isIndex === 0) {
      // Attach the keydown event listener when the component mounts
      window.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is the arrow down key (key code 40)
      if (event.keyCode === 40 || event.keyCode === 38) {
        event.preventDefault(); // Prevent the default scrolling behavior
        // Your custom handling for the arrow down key press can go here
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="booking">
      <div className="container">
        <div className="booking-box">
          <div className="booking-top">
            <div className="booking-top-left">
              <div className="info">
                <Title title="Request List" />
                <div className="booking-top-left-btns">
                  <button
                    onClick={() => {
                      setActivePage("booking");
                      setIsDetails(false);
                    }}
                    className={(activePage === "booking" && "active") || ""}
                  >
                    Quote Details
                  </button>
                  <button
                    onClick={() => {
                      setActivePage("user");
                      setIsDetails(false);
                    }}
                    className={(activePage === "user" && "active") || ""}
                  >
                    User Details
                  </button>
                </div>
              </div>
              <p>
                This is the list of all the quotes requested by the various portals
              </p>
            </div>
            <div className="booking-top-right">
              <ExportBtn genrateExcel={genrateExcel} />
            </div>
          </div>
          <BookingMneu menus={menus} />
          <Filters
            activePage={activePage}
            handleSearch={handleSearch}
            filterFunction={filterFunction}
            setSortName={setSortName}
            setGetuser={setGetuser}
            setFilterOP={setFilterOP}
            filterOP={filterOps}
            setFilterTogle={setFilterTogle}
          />
          <div ref={table} className="booking-table">
            {(activePage === "booking" && (
              <>
                {" "}
                {tableData && (
                  <Table
                    data={{
                      th: values.requestTH,
                      td: values.requestTD,
                      detailsHandler: setIsDetails,
                      isIndex: isIndex,
                      setIsIndex: (indx) => {
                        console.log(
                          "Updating isIndex from " + isIndex + " to " + indx
                        );
                        setIsIndex(indx);
                      },
                      isDetails,
                    }}
                    tableData={tempTableData}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                )}
                <QuoteDetails
                  // transpData={transpTableData}
                  // setTranspData={(ob)=>{setTranspTableData(ob)}}
                  isDetails={isDetails}
                  isIndex={isIndex}
                  handler={setIsDetails}
                  isUser={true}
                  currentUserId={currentUser}
                  setCurrentUserId={setCurrentUser}
                />
              </>
            )) || (
              <>
                <TableUser
                  data={{
                    th: values.userTH,
                    td: values.userTD,
                    detailsHandler: setIsDetails,
                    isIndex: isIndex,
                    setIsIndex,
                    isDetails,
                  }}
                  onRowClick={handleRowClick}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  getuser={getuser}
                />
                <UserDetails
                  isDetails={isDetails}
                  handler={setIsDetails}
                  user={selectedUserDetails}
                  isIndex={isIndex}
                  setIsIndex={setIsIndex}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </>
            )}
          </div>

          <Pagenation />
        </div>
      </div>

    </div>
  );
}
