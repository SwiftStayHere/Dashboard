import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import values from "../../../values";

// region

export default function EditableSelectCity({
  handler,
  activeValue,
  mainData,
  hotel = false,
}) {
  const [isDorp, setIsDrop] = useState(false);
  const ref = useRef(null);
  const refbtn = useRef(null);
  const [data, setData] = useState([{ name: "harun" }]);
  const [isAdd, setIsadd] = useState(false);
  const [value, setValue] = useState({ name: "" });

  const { role } = Cookies.get("login") && JSON.parse(Cookies.get("login"));

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        refbtn.current &&
        !refbtn.current.contains(e.target)
      ) {
        setIsDrop(false);
      }
    });
  }, []);

  useEffect(() => {
    setIsDrop(false);
  }, [activeValue]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      const parts = value.name.split("-");
      const ddd = {
        name: parts[0],
        zip: parts[1],
        region: mainData?.city,
        hotel,
      };

      axios
        .post(`${values.url}/transport/city`, ddd)
        .then((d) => {
          setData((prev) => {
            return [...prev, d.data];
          });
          setValue("");
          setIsadd(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleRemoveItem = (id) => {
    axios
      .delete(`${values.url}/transport/city?id=${id}`)
      .then((d) => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
    setData((prevData) => prevData.filter((item) => item._id !== id));
  };

  // connect with backend

  useEffect(() => {
    axios
      .get(`${values.url}/transport/city`)
      .then((d) => {
        setData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div ref={ref} className="select editable-select editable-select-city">
      <span onClick={() => setIsDrop(!isDorp)} className="active">
        {activeValue}
      </span>
      <button onClick={() => setIsDrop(!isDorp)} className="icon">
        <GoTriangleDown />
      </button>
      {isDorp && (
        <ul className="dropdown">
          {data?.length &&
            data
              .filter(
                (item) => item.region === mainData?.city && item.hotel === hotel
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((d, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      handler(d);
                    }}
                  >
                    {d.name}
                  </button>
                  {role === "admin" && (
                    <button
                      ref={refbtn}
                      className="del"
                      onClick={() => handleRemoveItem(d._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  )}
                </li>
              ))}
          {(isAdd && (
            <form onSubmit={submitHandler} className="editable-select-form">
              <input
                onChange={(e) => {
                  setValue({ name: e.target.value });
                }}
                value={value.name}
                type="text"
                placeholder="NomeCitta - Cap"
              />
            </form>
          )) ||
            (mainData?.city && role === "admin" && (
              <button
                onClick={(e) => {
                  setIsadd(true);
                }}
                className="add-btn"
                ref={refbtn}
              >
                + Aggiungi Città
              </button>
            ))}
        </ul>
      )}
    </div>
  );
}
