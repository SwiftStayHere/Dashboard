import { useEffect, useState } from "react";
import values from "../../../values";
import FilterItem from "./filterItem";

export default function Filter({ handler, filterOP, setFilterOP, setFilterTogle }) {
  // const [filterOPTem, setFilterOPTem] = useState({
  //   car: [],
  //   days: [],
  // });

  // useEffect(() => {
  //   setFilterOPTem(filterOP);
  // }, [filterOP]);

  return (
    <div className="filter">
      <div className="filter-top">
        <div className="name">
          <p>Filtri</p>
          <span>
            {filterOP?.transport?.length
              ? filterOP?.transport?.length
              : 0 + filterOP?.modules?.length
              ? filterOP?.modules?.length
              : 0}
          </span>
        </div>
        <button
          style={{ textDecoration: "none" }}
          onClick={() => {
            setFilterOP({
              transport: [],
              modules: [],
            });
            
          }}
        >
          Disattiva tutti
        </button>
      </div>
      <div className="filter-body">
        {values.filterData.map((item, i) => (
          <FilterItem
            filterOP={filterOP}
            setFilterOP={setFilterOP}
            key={i}
            index={i}
            data={item}
          />
        ))}
      </div>

      <div className="filter-btns">
        <button
          onClick={() => {
            handler(false);
            setFilterOP({
              transport: [],
              modules: [],
            });
            setFilterTogle((prev) => !prev);
          }}
          className="cancel"
        >
          Annulla
        </button>
        <button
          onClick={() => {
            handler(false);
            setFilterTogle((prev) => !prev);
          }}
          className="apply"
        >
          Applica
        </button>
      </div>
    </div>
  );
}
