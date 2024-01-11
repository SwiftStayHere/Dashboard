import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import AnimateValue from "../basic/AnimateValue";
import Pagenation from "../booking/Pagenation";
import ModuleDetailsTable from "./ModuleDetailsTabel";

export default function ModuleDetils({ handler, addhotel }) {
  const ref = useRef(null);
  const wrp = useRef(null);
  const [isIndex, setIsIndex] = useState(false);

  const Progress = ({ data }) => {
    const [wd, setWd] = useState(1);
    useEffect(() => {
      const interval = setInterval(() => {
        if (wd < data) {
          setWd(wd + 1);
        }
      }, 1);

      return () => {
        clearInterval(interval);
      };
    });

    return (
      <div
        style={{
          width: `${(wd / 2200) * 100}%`,
        }}
        className="progress"
      ></div>
    );
  };

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  const [items, setItems] = useState([
    {
      name: "Total No. of Request",
      value: "302",
      name1: "Confirmed Request",
      value1: "217",
    },
    {
      name: "Total Amount Requested",
      value: "52.8",
      name1: "Avg. Request Amount",
      value1: "1.5",
      pre: "$",
      pre1: "$",
      next: "K",
      next1: "K",
    },
    {
      name: "Conversion Rate",
      value: "87",
      name1: "Avg amount earned",
      value1: "2.5",

      pre1: "$",
      next: "%",
      next1: "K",
    },
  ]);

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-details`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <div className="left">
            <h4>Add New Module</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="module-details-body">
          <div className="module-details-body-top">
            {items.map((item, i) => (
              <div key={i} className="item">
                <div className="item-left">
                  <span>{item.name}</span>
                  <strong>{item.pre}</strong>
                  <AnimateValue data={parseFloat(item.value)} />
                  <strong>{item.next}</strong>
                </div>{" "}
                <div className="separator"></div>
                <div className="item-left">
                  <span>{item.name1}</span>
                  <strong>{item.pre1}</strong>
                  <AnimateValue data={parseFloat(item.value1)} />
                  <strong>{item.next1}</strong>
                </div>
              </div>
            ))}

            <div className="item prog">
              <div className="item-top">
                <span>Overall Score</span>
                <span>1938</span>
              </div>
              <div className="progress-bar">
                <Progress data={1938} />
              </div>
            </div>
          </div>
          <div className="module-details-body-table"></div>
          <ModuleDetailsTable
            data={{
              detailsHandler: () => {
                return;
              },
              isIndex: isIndex,
              setIsIndex,
            }}
          />
          <Pagenation isbrns={true} />
        </div>
      </div>
    </div>
  );
}
