import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import AddBtn from "../booking/AddBtn";
import Filter from "../booking/Filter";
import Search from "./Search";
import Select from "./Select";

export default function Filters({
  activePage,
  search,
  setSearch,
  sortValue,
  setSortValue,
  filterOP,
  setFilterOP,
  pls,
  handleSearch,
  filterFunction,
  setGetuser,
  setSortName,
  setFilterTogle,
}) {
  const [isFilter, setIsFilter] = useState(false);
  const filter = useRef(null);

  const closeHandler = () => {
    setIsFilter(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (filter.current && !filter.current.contains(e.target)) {
        setIsFilter(false);
      }
    });
  }, []);

  return (
    <div className="booking-filter">
      <Search
        search={search}
        pls={pls || "Search"}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className="booking-filters">
        {activePage && (
          <AddBtn activePage={activePage} setGetuser={setGetuser} />
        )}
        <div className="sort booking-btn transport-sort">
          <div className="icon">
            <HiMiniBars3BottomLeft />
          </div>

          <Select
            handler={(e) => { }}
            data={[
              "No orders applied",
              "Sort from newest to furthest",
              "Sort from furthest to newest",
              "Show those with the most requested quotes first",
              "Show quotes to send first",
              "Show To be Processed quotes first",
              "Show quotes with Errors first",
              "Show quotes first with CTA Clicked",
              "Show quotes with customer name first in alphabetical order (A-Z)",
              "Show quotes with customer name first in alphabetical order (Z-A)",
            ]}
            activeValue={sortValue}
            filterFunction={filterFunction}
            setSortName={setSortName}
          />
        </div>
        <div ref={filter} className=" booking-btn filter-btn-wrp">
          <button
            onClick={() => {
              setIsFilter(!isFilter);
            }}
            className="filter-btn"
          >
            <div className="icon">
              <FiFilter />
            </div>

            <p>Filters</p>
            <span>{filterOP?.transport?.length + filterOP?.modules?.length || 0}</span>
          </button>

          {isFilter && (
            <Filter
              filterOP={filterOP}
              setFilterOP={setFilterOP}
              setFilterTogle={setFilterTogle}
              handler={closeHandler}
            />
          )}
        </div>
        {/* <DateLine
          data={[
            "Today",
            " Last day",
            "Last 7 days",
            "Last Month",
            "Last Year",
          ]}
          defaultText="show:"
          icon={<BsCalendarEvent />}
        /> */}
      </div>
    </div>
  );
}
