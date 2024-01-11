import { useEffect, useRef, useState } from "react";
import SendBtn from "./SendBtn";

export default function SendMessage({ data }) {
  const [isSend, setIsSend] = useState(false);
  const ref = useRef(null);
  const [row, setRow] = useState(1);
  const [value, setValue] = useState(data.text);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  useEffect(() => {
    if (isSend) {
      setTimeout(() => {
        ref.current.style.opacity = "0";
      }, 2500);
      setTimeout(() => {
        setIsSend(false);
        ref.current.style.opacity = "1";
      }, 3000);
    }
  }, [isSend]);

  useEffect(() => {
    if ((value.match(/\n/g) || []).length >= 0) {
      setRow((value.match(/\n/g) || []).length + 1);
    }
  }, [value]);

  const handleAddButtonClick = () => {
    setIsAddPopupOpen(true);
  };


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setIsSend(true);
      }}
      className="form send-message"
      action=""
    >
      <div className="form-body">
        <div className="form-group">
          <label htmlFor="textaria"> Invia Messaggio</label>
          <textarea
            onChange={(e) => {
              setValue(e.target.value);
            }}
            name=""
            id="textaria"
            cols="30"
            rows={row}
            value={value}
          ></textarea>
        </div>

        <div className="form-group send">
          {/* Replace "Sort" with "+ Add" */}
          {/* <button type="button" ref={ref}onClick={handleAddButtonClick}>
            + Add
          </button>  */}
          <SendBtn data={{ send: "Invia Messaggio", sent: "Messaggio Inviato" }} />
        </div>
      </div>
    </form>
  );
}
