import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Select from "../basic/Select";
import Input from "./Input";

export default function Supplement({ supplement, setSupplement }) {
  const rx = /^(\d+(\.\d{0,2})?)?$/;
  return (
    <div className="add-new-offer-details supplement">
      {supplement?.map((d, i) => (
        <div key={i} className="item-wrp">
          <div className="item">
            <label htmlFor="Massimo notti">Supplement {i + 1}</label>

            <Input
              type="text"
              handler={(e) => {
                setSupplement((prevSupplement) => {
                  const updatedSupplement = [...prevSupplement];
                  updatedSupplement[i].name = e;
                  return updatedSupplement;
                });
              }}
              d={{ value: d.name, label: "Enter a Supplement" }}
            />
          </div>
          <div className="item">
            <label htmlFor="">Price</label>
            <div className="inner">
              <Select
                data={["€", "$"]}
                activeValue={d.currency || "€"}
                handler={(e) => {
                  setSupplement((prevSupplement) => {
                    const updatedSupplement = [...prevSupplement];
                    updatedSupplement[i].currency = e;
                    return updatedSupplement;
                  });
                }}
              />
              <Input
                handler={(e) => {
                  setSupplement((prevSupplement) => {
                    const updatedSupplement = [...prevSupplement];
                    updatedSupplement[i].price =
                      (rx.test(e) && e) || (e.length < 2 ? 0 : d.price);
                    return updatedSupplement;
                  });
                }}
                d={{ value: d.price, label: "Price" }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setSupplement((prevValues) =>
                prevValues.filter((value, j) => i !== j)
              );
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setSupplement((prev) => {
            return [...prev, {}];
          });
        }}
      >
        <AiOutlinePlus /> Add Supplement
      </button>
    </div>
  );
}
