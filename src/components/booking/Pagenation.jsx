import { useEffect, useState } from "react";

export default function Pagenation({
  isbrns,
  max,
  active,
  setActiveValue,
  setIsLoading,
  search,
  showItem = 30,
  btn = "",
}) {
  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(btns[0]);

  useEffect(() => {
    const btn = max / showItem;
    setBtns([]);
    for (let i = 1; i <= btn + 1; i++) {
      setBtns((prev) => {
        return [...prev, i];
      });
    }
  }, [max]);

  useEffect(() => {
    if (typeof setActiveValue === "function") {
      setActiveValue(activeBtn);
    }
  }, [activeBtn]);

  useEffect(() => {
    setActiveBtn(1);
  }, [search, btn]);

  return (
    <div className="pagenation-wrp">
      <span>
        Showing {max && showItem * active - showItem + 1} -{" "}
        {(showItem * active < max && showItem * active) || max} on {max || "0"}
      </span>
      {isbrns && (
        <ul className="pagenation">
          <li>
            <button
              onClick={() => {
                if (activeBtn > 1) {
                  setActiveBtn(activeBtn - 1);
                }
              }}
              disabled={activeBtn === 1}
              className="prenext"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveBtn(1)}
              className={`pagenation-btn ${
                (activeBtn === 1 && "active") || ""
              }`}
            >
              1
            </button>
          </li>
          {btns.length > 5 && activeBtn > btns[0] + 2 && "..."}
          {btns.map((btn) => (
            <div key={btn}>
              {((btn !== 1 &&
                btn !== btns[btns.length - 1] &&
                activeBtn === btn) ||
                (activeBtn - 1 === btn && btn !== 1) ||
                (activeBtn + 1 === btn && btn !== btns[btns.length - 1]) ||
                (btns.length <= 5 &&
                  btn !== 1 &&
                  btn !== btns[btns.length - 1])) && (
                <li>
                  <button
                    onClick={() => setActiveBtn(btn)}
                    className={`pagenation-btn ${
                      (activeBtn === btn && "active") || ""
                    }`}
                  >
                    {btn}
                  </button>
                </li>
              )}
            </div>
          ))}

          {
            <>
              {btns.length > 5 &&
                activeBtn < btns[btns.length - 1] - 2 &&
                "..."}
              {btns[btns.length - 1] !== 1 && (
                <li>
                  <button
                    onClick={() => setActiveBtn(btns[btns.length - 1])}
                    className={`pagenation-btn ${
                      (activeBtn === btns[btns.length - 1] && "active") || ""
                    }`}
                  >
                    {btns[btns.length - 1]}
                  </button>
                </li>
              )}
            </>
          }

          <li>
            <button
              onClick={() => {
                if (activeBtn < btns[btns.length - 1]) {
                  setActiveBtn(activeBtn + 1);
                }
              }}
              disabled={activeBtn === btns[btns.length - 1]}
              className="prenext"
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
