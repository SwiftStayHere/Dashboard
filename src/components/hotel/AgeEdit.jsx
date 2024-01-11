import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import values from "../../../values";
import Input from "../hotel-edit/Input";

const rx = /^(\d+(\.\d{0,2})?)?$/;

export default function AgeEdit({ isEdit, data, setData }) {
  const [items, setItems] = useState([]);

  const handleRemoveParentItem = (parentId) => {
    const updatedItems = items.filter(
      (parentItem) => parentItem.id !== parentId
    );
    setItems(updatedItems);
  };

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${values.url}/hotel/single/${id}`).then((d) => {
      setItems(d.data?.ageDeductions);
    });
  }, []);

  useEffect(() => {
    setData &&
      setData((prev) => {
        return {
          ...prev,
          ageDeductions: items,
        };
      });
  }, [items]);

  // Function to update value dynamically
  const updateValue = (itemId, subItemId, newValue) => {
    const updatedItems = items?.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.items.map((subItem) => {
          if (subItem.id === subItemId) {
            // if (typeof subItem.value === "number") {
            // return { ...subItem, value: parseInt(newValue) };
            return {
              ...subItem,
              value:
                Number(newValue) === 0
                  ? 0
                  : Number(
                      subItem.label === "Age Limit"
                        ? rx.test(newValue)
                          ? (Number(newValue) < 18 && newValue) || 18
                          : 0
                        : rx.test(newValue.toString())
                        ? (newValue < 100 && newValue) || 100
                        : 0
                    ),
            };
            // } else {
            //   return { ...subItem, value: newValue };
            // }
          }
          return subItem;
        });
        return { ...item, items: updatedSubItems };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // console.log(items);

  return (
    <>
      <div className="age-edit">
        {items?.map((d, i) => {
          return (
            <>
              <div key={i} className="age-edit-item">
                {d.items.map((d1, i) => (
                  <>
                    <div
                      key={i}
                      className={
                        d1.label === "Age Limit"
                          ? "age-edit-item-input"
                          : "age-edit-item-form-group discount"
                      }
                    >
                      {/* <div key={i} className={"age-edit-item-input"}> */}
                      <label htmlFor="">
                        {d1.label === "Age Limit" ? "Età Massima" : "Sconto"}
                      </label>
                      {d1.label !== "Age Limit" && <span>%</span>}
                      <Input
                        d={{ value: d1.value }}
                        handler={(e) => {
                          updateValue(d.id, d1.id, e);
                        }}
                      />
                    </div>
                  </>
                ))}

                {isEdit && (
                  <button
                    onClick={() => handleRemoveParentItem(d.id)}
                    className="delete"
                  >
                    <RiDeleteBin2Line />
                    Rimuovi
                  </button>
                )}
              </div>
            </>
          );
        })}
        {isEdit && (
          <button
            onClick={() => {
              setItems((prev) => {
                return [
                  ...prev,
                  {
                    id: items.length + 1 + Math.random(),
                    items: [
                      {
                        id: 1,
                        label: "Age Limit",
                        value: 0,
                      },
                      {
                        id: 2,
                        label: "Discount",
                        value: 0,
                      },
                    ],
                  },
                ];
              });
            }}
            className="age-edit-show"
          >
            Add Age Reduction
          </button>
        )}
      </div>
    </>
  );
}
