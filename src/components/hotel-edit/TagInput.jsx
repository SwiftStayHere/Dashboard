import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import values from "../../../values";

const isAlreadyPresentInTags = (inputString, array) => {
  const cleanInputString = inputString?.replace(/\s/g, "").toLowerCase();
  const cleanArray = array?.map((str) =>
    str?.name.replace(/\s/g, "").toLowerCase()
  );
  return cleanArray?.includes(cleanInputString);
};

export default function TagInput({
  tags,
  handler,
  name,
  setData,
  data,
  fixtData,
}) {
  const [active, setActive] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!value) return;
    if (!isAlreadyPresentInTags(value, tags)) {
      try {
        await axios.post(
          `${values.url}/tag`,
          { tag: value, tagCat: name },
          {
            headers: {
              token,
            },
          }
        );
        handler((prev) => {
          return [...prev, { name: value }];
        });
        setActive((prev) => {
          return [...prev, value];
        });
      } catch (error) {
        console.log(error);
      }
    }
    setValue("");
    setIsInput(false);
  };

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${values.url}/hotel/single/${id}`).then((d) => {
      if (name === "hotelServices") {
        setActive(data?.services || []);
      } else if (name === "hotelStrengths") {
        setActive(data?.strengths || []);
      } else if (name === "offerTags") {
        setActive(fixtData || []);
      }
      // });
    });
  }, [fixtData]);

  useEffect(() => {
    if (name === "hotelServices") {
      setData((prev) => {
        return {
          ...prev,
          services: active,
        };
      });
    } else if (name === "offerTags") {
      setData(active);
    } else {
      setData((prev) => {
        return {
          ...prev,
          strengths: active,
        };
      });
    }
  }, [active]);

  return (
    <ul className="tag-input">
      {tags?.map((tag, i) => (
        <li
          onClick={() => {
            if (!active.includes(tag.name)) {
              setActive((prev) => {
                return [...prev, tag.name];
              });
            } else {
              const updatedItems = active.filter((item) => item !== tag.name);
              setActive(updatedItems);
            }
          }}
          className={(active?.includes(tag.name) && "active") || ""}
          key={i}
        >
          {/* {d.icon} */}
          {tag.name}
        </li>
      ))}
      {(!isInput && (
        <button onClick={() => setIsInput(true)}>
          <AiOutlinePlus />
          Add
        </button>
      )) || (
        <form onSubmit={submitHandler}>
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            type="text"
          />
          <button
            type="submit"
            // onClick={submitHandler}
            disabled={!value || tags?.includes(value)}
          >
            <AiOutlinePlus />
          </button>
        </form>
      )}
    </ul>
  );
}
