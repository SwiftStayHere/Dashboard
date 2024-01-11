import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import Input from "./Input";

export default function EditTitle({
  isInput = false,
  data,
  isShow,
  closeHandler,
  changeHandler,
}) {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeHandler();
      }
    });
  });

  return (
    <div ref={wrp} className={`edit-title-wrp ${(isShow && "show") || ""}`}>
      <div ref={ref} className={`edit-title booking-box `}>
        <div className="edit-title-top">
          <h4>{(isInput && "Edit Description") || "Edit Title"}</h4>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>
        <p>
          {(isInput && "Change the title of this description") ||
            "Change the title of the Distance option"}
        </p>

        <div className="item">
          <label htmlFor="">
            {(isInput && "Title Description") || "Distance Name"}
          </label>
          <Input handler={setValue} d={{ value, label: "Enter Title" }} />
        </div>

        <div className="edit-title-footer">
          <button onClick={closeHandler} className="btn cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              if (value) {
                changeHandler(value);
              }
            }}
            className="btn"
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
}
