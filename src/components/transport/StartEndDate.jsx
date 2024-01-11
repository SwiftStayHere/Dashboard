import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";

export default function StartEndDate({
  setData,
  transportData,
  add,
  dd,
  setIsChange,
}) {
  const [dates, setDates] = useState([
    {
      start: "",
      end: "",
    },
    {
      start: "",
      end: "",
    },
  ]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        date: dates,
      };
    });
  }, [dates]);

  useEffect(() => {
    if (transportData && !add) {
      setDates(
        transportData?.date || [
          {
            start: "",
            end: "",
          },
        ]
      );
    } else {
      setDates([
        {
          start: "",
          end: "",
        },
      ]);
    }
  }, [transportData]);
  return (
    <>
      {dates?.map((d, i) => (
        <div key={i} className="add-transport-group">
          <div className="form-group">
            <label htmlFor="" style={{ color: "#000" }}>
              Data d’inizio
            </label>
            <input
              value={d?.start}
              max={d?.end || ""}
              onChange={(e) => {
                setIsChange(true);
                setDates((prevDates) => {
                  const updatedDates = [...prevDates];
                  updatedDates[i].start = e.target.value;
                  return updatedDates;
                });
              }}
              type="date"
              name=""
              id=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="" style={{ color: "#000" }}>
              Data finale
            </label>
            <input
              value={d?.end}
              min={d?.start || ""}
              onChange={(e) => {
                setIsChange(true);
                setDates((prevDates) => {
                  const updatedDates = [...prevDates];
                  updatedDates[i].end = e.target.value;
                  return updatedDates;
                });
              }}
              type="date"
              name=""
              id=""
            />
          </div>
          <button
            onClick={() => {
              setDates((prevDates) => prevDates.filter((_, j) => i !== j));
            }}
            className="delete date_delete"
          >
            <AiFillDelete />
          </button>
        </div>
      ))}

      <butto
        onClick={() => {
          setDates((prev) => {
            return [
              ...prev,
              {
                start: "",
                end: "",
              },
            ];
          });
        }}
        className="add-date-item-btn"
      >
        <AiOutlinePlus />
        Periodo di Validità
      </butto>
    </>
  );
}
