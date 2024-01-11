import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import values from "../../../values";

export default function DeleteHotel({
  data,
  isShow,
  closeHandler,
  changeHandler,
  publish,
  hotelData,
}) {
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const wrp = useRef(null);
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeHandler();
      }
    });
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!value) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [value]);

  const disableHandler = () => {
    hotelData.disabled = !publish;
    axios
      .put(`${values.url}/hotel`, hotelData, {
        headers: {
          token,
        },
      })
      .then((d) => {
        closeHandler();
        setValue("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      ref={wrp}
      className={`edit-title-wrp delete-disable ${(isShow && "show") || ""}`}
    >
      <div ref={ref} className={`edit-title booking-box `}>
        <div className="edit-title-top">
          <h4>
            {(isShow === "delete" && "Elimina Hotel") ||
              (hotelData?.publish && "Disabilita Hotel") ||
              "Riabilita Hotel"}
          </h4>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>
        <p>
          {(isShow === "delete" &&
            "Inserisci il nome dell'hotel per poterlo eliminare") ||
            (hotelData?.publish &&
              "Inserisci il nome dell'hotel per poterlo eliminare") ||
            "Inserisci il nome dell'hotel per poterlo riabilitare"}
        </p>

        <div className="item">
          <label htmlFor="">
            {(isShow === "delete" && "Nome Hotel") || "Nome Titolo"}
          </label>
          <input
            className={`${isError && "error"} ${
              isShow === "disable" && "disable"
            }`}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={data}
          />
        </div>

        <div className="edit-title-footer">
          <button onClick={closeHandler} className="btn cancel">
            Annulla
          </button>
          <button
            onClick={() => {
              if (value) {
                if (isShow === "delete") {
                  changeHandler(value);
                } else {
                  disableHandler();
                }
              }
            }}
            style={{
              backgroundColor: `${
                (isShow !== "delete" && "#ff9500") || "#ff4e4e"
              }`,
            }}
            className="btn delete"
            disabled={!(data === value)}
          >
            {(isShow === "delete" && "Elimina") ||
              (hotelData?.publish && "Disabilita") ||
              "Riabilita"}
          </button>
        </div>
      </div>
    </div>
  );
}
