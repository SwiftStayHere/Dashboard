import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Select from "../basic/Select";
import EditTitle from "./EditTItle";
import Input from "./Input";

const defaultDistances = [
  {
    id: 2 + Math.random(),
    isEdit: false,
    label: "Distanza dal Centro",
    distance: 0,
    scale: "Mt",
  },
  {
    id: 1 + Math.random(),
    isEdit: false,
    label: "Distanza dal Mare",
    distance: 0,
    scale: "Mt",
  },

  {
    id: 3 + Math.random(),
    isEdit: false,
    label: "Distanza dalle Terme",
    distance: 0,
    scale: "Mt",
  },
];

const LocationDistances = ({ data, setData, fixtData }) => {
  const [distances, setDistances] = useState([]);
  const { id } = useParams();
  const toggleEdit = (itemId) => {
    const updatedDestinces = distances.map((item, i) => {
      if (i === itemId) {
        return { ...item, isEdit: !item.isEdit };
      }
      return item;
    });
    setDistances(updatedDestinces);
  };

  const handleChange = (itemId, newValue, property) => {
    if (property === "distance") {
      const rx = /^(\d+(\.\d{0,2})?)?$/;
      const updatedDestinces = distances.map((item, i) => {
        if (i === itemId) {
          return {
            ...item,
            [property]:
              (rx.test(newValue) && newValue) ||
              (newValue.length < 2 ? 0 : item.distance),
            isEdit: false,
          };
        }
        return item;
      });
      setDistances(updatedDestinces);
    } else {
      const updatedDestinces = distances.map((item, i) => {
        if (i === itemId) {
          return {
            ...item,
            [property]: newValue,
            isEdit: false,
          };
        }
        return item;
      });
      setDistances(updatedDestinces);
    }
  };
  useEffect(() => {
    setDistances(fixtData?.distance || defaultDistances);
  }, [fixtData]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        distance: distances,
      };
    });
  }, [distances]);

  const deleteHandler = (index) => {
    setDistances((prevDistances) =>
      prevDistances.filter((_, i) => i !== index)
    );
  };

  console.log(distances);

  return (
    <div className="location-details-bottom">
      <h4>Distance</h4>
      <p>Enter the distances to the various places</p>

      <div className="destince">
        {data?.distance?.map((d, i) => (
          <>
            <div key={i} className="destince-item">
              <div className="destince-item-top">
                <span>{d.label}</span>
                <EditTitle
                  closeHandler={(e) => toggleEdit(i)}
                  changeHandler={(e) => handleChange(i, e, "label")}
                  isShow={d.isEdit}
                  data={d.label}
                />
                <button onClick={() => toggleEdit(i)}>
                  <FiEdit />
                </button>
              </div>
              <div className="destince-item-body">
                <Select
                  data={["Mt", "Km"]}
                  activeValue={d.scale}
                  handler={(e) => handleChange(i, e, "scale")}
                />
                <Input
                  d={{ value: d.distance, label: "" }}
                  handler={(e) => handleChange(i, e, "distance")}
                />
                <button onClick={() => deleteHandler(i)} className="delete-btn">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </>
        ))}
        <button
          onClick={() => {
            setDistances((prev) => {
              return [
                ...prev,
                {
                  id: prev.length + 1 + Math.random(),
                  label: "Aggiungi Nome",
                  distance: 0,
                  scale: "Mt",
                },
              ];
            });
          }}
        >
          <AiOutlinePlus /> Add Option
        </button>
      </div>
    </div>
  );
};

export default LocationDistances;
