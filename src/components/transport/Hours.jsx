import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Hours({
  data,
  handler,
  transportData,
  add,
  setIsChange,
}) {
  const [hours, setHours] = useState(data);
  const [isInput, setIsInput] = useState(false);
  const [active, setActive] = useState(data);
  const [value, setValue] = useState({ value: "08:30", isEdit: false });

  useEffect(() => {
    handler((prev) => {
      return {
        ...prev,
        hours: active,
      };
    });
  }, [active]);

  const changeHandler = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        value: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (transportData && !add) {
      setHours(transportData?.hours || []);
      setActive(transportData?.hours || []);
    } else {
      setHours([]);
      setActive([]);
    }
  }, [transportData]);

  return (
    <ul className="hours-inner">
      {hours.map((d, i) => (
        <>
          {(!d.isEdit && (
            <li
              className={data?.includes(d) && "active"}
              key={i}
              onDoubleClick={() => {
                setHours((prevHours) => {
                  const updatedHours = [...prevHours];
                  updatedHours[i].isEdit = true;
                  return updatedHours;
                });
              }}
              onClick={() => {
                if (active.includes(d)) {
                  setActive((prev) => {
                    const updatedHours = active.filter(
                      (e) => e.value !== d.value
                    );
                    return updatedHours;
                  });
                } else {
                  setActive((prev) => {
                    return [...prev, d];
                  });
                }
              }}
            >
              {d?.value}
            </li>
          )) || (
            <form
              onSubmit={(e) => {
                setIsChange(true);
                e.preventDefault();
                let updatedHours = [];
                setHours((prevHours) => {
                  updatedHours = [...prevHours];
                  updatedHours[i].isEdit = false;
                  return updatedHours;
                });
                setActive((prev) => {
                  return [...prev, updatedHours[i]];
                });
              }}
            >
              <input
                type="time"
                name="time"
                value={d.value}
                step="1800"
                id=""
                onChange={(e) => {
                  setHours((prevHours) => {
                    const updatedHours = [...prevHours];
                    updatedHours[i].value = e.target.value;
                    return updatedHours;
                  });
                }}
              />
              <button type="submit">Aggiorna</button>
            </form>
          )}
        </>
      ))}
      {(isInput && (
        <form
          onSubmit={(e) => {
            setIsChange(true);
            setHours((prev) => {
              return [...prev, value];
            });
            setActive((prev) => {
              return [...prev, value];
            });
            setValue({ value: "08:30", isEdit: false });
            setIsInput(false);
          }}
        >
          <input
            type="time"
            name="time"
            value={value.value}
            step="1800"
            onChange={changeHandler}
            id=""
          />
          <button type="submit">Aggiungi</button>
        </form>
      )) || (
        <button
          onClick={() => {
            setIsInput(true);
          }}
        >
          <AiOutlinePlus /> Aggiungi Altri
        </button>
      )}
    </ul>
  );
}
