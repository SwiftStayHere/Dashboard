import { useEffect, useState } from "react";

export default function Days({
  setData,
  data,
  transportData,
  add,
  setIsChange,
}) {
  const [days, setDays] = useState([
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ]);
  const [activeDays, setActiveDays] = useState((data && data) || []);

  const handler = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays((prevDays) => prevDays.filter((d) => d !== day));
    } else {
      setActiveDays((prev) => {
        return [...prev, day];
      });
    }
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        days: activeDays,
      };
    });
  }, [activeDays]);

  useEffect(() => {
    if (!add && transportData) {
      setActiveDays(transportData?.days || []);
    } else {
      setActiveDays([]);
    }
  }, [transportData]);

  return (
    <div className="transport-days">
      <div className="top">
        <strong>Giorni Validi</strong>{" "}
        {!(days === activeDays) && (
          <button
            onClick={() => {
              setActiveDays(days);
              setIsChange(true);
            }}
          >
            Seleziona Tutti
          </button>
        )}
      </div>
      <ul className="days">
        {days.map((day) => (
          <li className={activeDays.includes(day) && "active"} key={day}>
            <button
              onClick={() => {
                handler(day);
                setIsChange(true);
              }}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
