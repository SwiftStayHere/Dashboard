import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function FilterItem({ data, filterOP, setFilterOP, index }) {
  const [collops, setCollops] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const carHandler = (e) => {
    setFilterOP((prev) => {
      const updatedFilter = { ...prev };
      if (!updatedFilter[e.target.name]) {
        updatedFilter[e.target.name] = [];
      }

      if (e.target.checked) {
        if (!filterOP[e.target.name].includes(e.target.value)) {
          updatedFilter[e.target.name].push(e.target.value);
        }
      } else {
        updatedFilter[e.target.name] = updatedFilter[e.target.name].filter(
          (item) => item !== e.target.value
        );
      }

      return updatedFilter;
    });
  };

  return (
    <div className="filter-item">
      <button onClick={() => setCollops(!collops)}>
        <span>{data.name}</span>{" "}
        {
          <small>
            {index === 0 && filterOP && filterOP?.transport
              ? filterOP?.transport?.length
              : index !== 0 && filterOP && filterOP?.modules
              ? filterOP?.modules?.length
              : 0}
          </small>
        }
        {<FaAngleDown /> || <FaAngleUp />}
      </button>
      <ul className={`filter-item-body ${(collops && "show") || ""}`}>
        {(!isAll &&
          data?.items.slice(0, 4).map((d, i) => (
            <div key={i} className="group">
              <input
                name={(index === 0 && "transport") || "modules"}
                onChange={carHandler}
                value={d}
                type="checkbox"
                checked={
                  (index === 0 && filterOP?.transport?.includes(d)) ||
                  filterOP?.modules?.includes(d)
                }
                id={d}
              />
              <label htmlFor={d}>{d}</label>
            </div>
          ))) ||
          data?.items.map((d, i) => (
            <div key={i} className="group">
              <input
                name={(index === 0 && "transport") || "modules"}
                onChange={carHandler}
                value={d}
                type="checkbox"
                id={d}
                checked={
                  (index === 0 && filterOP?.transport.includes(d)) ||
                  filterOP?.modules.includes(d)
                }
              />
              <label htmlFor={d}>{d}</label>
            </div>
          ))}
        {data?.items.length > 4 && (
          <div className="filter-item-bottom">
            <button
              onClick={() => {
                setIsAll(!isAll);
              }}
            >
              {(isAll && "Mostra meno") || "Mostra tutti"}
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
