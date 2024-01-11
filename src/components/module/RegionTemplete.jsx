import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import values from "../../../values";

export default function RegionTemplate({
  handler,
  addhotel,
  setData,
  tempLoad,
  setTempLoad,
}) {
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
        setIsDelete(false);
      }
    });
  });

  const [items, setItems] = useState([]);

  const [activeItem, setActiveItem] = useState({});

  const createHandler = () => {
    setData(activeItem?.dates);
    handler(false);
  };

  useEffect(() => {
    axios
      .get(`${values.url}/module/regionTempletes`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setItems(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tempLoad]);

  const deleteHandler = (item) => {
    setIsLoading(true);
    axios
      .delete(`${values.url}/module/regionTemplete?id=${item?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsDelete(false);
        setIsLoading(false);
        setTempLoad(!tempLoad);
      })
      .catch((e) => {
        setIsDelete(false);
        setIsLoading(false);
        setTempLoad(!tempLoad);
        console.log(e);
      });
  };
  const [search, setSearch] = useState("");
  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-template`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <HiDocumentText />
          </span>
          <button
            onClick={() => {
              handler(false);
              setIsDelete(false);
            }}
            className="close"
          >
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Template lista Città</h4>
          <p>Seleziona il template della lista Città che desideri importare</p>
          <div className="module-template-search">
            <label htmlFor="search">
              <BiSearch />
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cerca"
              id="search"
            />
          </div>
          <div className="module-template-items">
            <div className="left">
              {items
                ?.filter((item) => item.name.includes(search))
                .map((item, i) => (
                  <div key={i} className="del-wrp">
                    <div
                      className={`item ${
                        (activeItem?._id === item?._id && "active") || ""
                      }`}
                      onClick={() => {
                        setActiveItem(item);
                      }}
                    >
                      <HiDocumentText />
                      <div className="content">
                        <h4>{item?.name}</h4>
                        <p>{item?.dates.length} Città</p>
                      </div>
                    </div>
                    {isDelete && (
                      <div className="isdelete">
                        <h2 className="jakarta">
                          Vuoi eliminare {item?.name}?
                        </h2>

                        <div className="buttons">
                          <button
                            onClick={() => {
                              setIsDelete(false);
                              handler(true);
                            }}
                            className="btn"
                          >
                            Annulla
                          </button>

                          {(isLoading && (
                            <button
                              disabled
                              className="delete-btn  spinner btn "
                            >
                              <div className="bounce1"></div>
                              <div className="bounce2"></div>
                              <div className="bounce3"></div>
                            </button>
                          )) || (
                            <button
                              onClick={() => deleteHandler(item)}
                              className="delete-btn btn"
                            >
                              Elimina
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setIsDelete(true)}
                      className="del-icon"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="add-hotel-footer ">
          <button onClick={() => handler(false)} className="btn cancel">
            Annulla
          </button>
          <button onClick={createHandler} className="btn">
            Seleziona
          </button>
        </div>
      </div>
    </div>
  );
}
