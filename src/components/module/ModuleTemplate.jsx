import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../../values";

export default function ModuleTemplate({
  handler,
  addhotel,
  setData,
  tempLoad,
  setTempLoad,
  setFixtData,
}) {
  const navigate = useNavigate();
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const [isLoading, setIsLoading] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  const [items, setItems] = useState([]);

  const [activeItem, setActiveItem] = useState({});

  const createHandler = () => {
    setData(activeItem);
    setFixtData(activeItem);
    handler(false);
  };

  useEffect(() => {
    axios
      .get(`${values.url}/module/templetes`, {
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
      .delete(`${values.url}/module/templete?id=${item?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsLoading(false);
        setIsDelete(false);
        setTempLoad(!tempLoad);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsDelete(false);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4635 1.37373C15.3214 1.24999 13.8818 1.24999 12.0453 1.25H11.9547C10.1182 1.24999 8.67861 1.24999 7.53648 1.37373C6.37094 1.50001 5.42656 1.76232 4.62024 2.34815C4.13209 2.70281 3.70281 3.13209 3.34815 3.62024C2.76232 4.42656 2.50001 5.37094 2.37373 6.53648C2.24999 7.67861 2.24999 9.11822 2.25 10.9548V13.0453C2.24999 14.8818 2.24999 16.3214 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62024 21.6518C5.42656 22.2377 6.37094 22.5 7.53648 22.6263C8.67859 22.75 10.1182 22.75 11.9547 22.75H12.0453C13.8818 22.75 15.3214 22.75 16.4635 22.6263C17.6291 22.5 18.5734 22.2377 19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798C21.2377 19.5734 21.5 18.6291 21.6263 17.4635C21.75 16.3214 21.75 14.8818 21.75 13.0453V10.9547C21.75 9.11824 21.75 7.67859 21.6263 6.53648C21.5 5.37094 21.2377 4.42656 20.6518 3.62024C20.2972 3.13209 19.8679 2.70281 19.3798 2.34815C18.5734 1.76232 17.6291 1.50001 16.4635 1.37373ZM6 9.5C6 8.94772 6.44771 8.5 7 8.5H15C15.5523 8.5 16 8.94772 16 9.5C16 10.0523 15.5523 10.5 15 10.5H7C6.44771 10.5 6 10.0523 6 9.5ZM6 14.5C6 13.9477 6.44771 13.5 7 13.5H10C10.5523 13.5 11 13.9477 11 14.5C11 15.0523 10.5523 15.5 10 15.5H7C6.44771 15.5 6 15.0523 6 14.5Z"
                fill="#005cab"
              />
            </svg>
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Template Sezioni</h4>
          <p>Seleziona il template delle sezioni che desideri importare</p>
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
                ?.map((item, i) => (
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
                      <div className="content dfjlsjdfjsdf">
                        <h4>{item?.name}</h4>
                        <p>
                          {(item?.section1Video ||
                            item?.section1Title ||
                            item?.section1Description) &&
                            "Sezione 1"}
                          {(item?.section2Video1 ||
                            item?.section2Video2 ||
                            item?.section2Title ||
                            item?.section2Description) &&
                            " , Sezione 2"}
                          {((item?.section3Title ||
                            item?.section3Description ||
                            item?.blog.length) &&
                            ", Sezione 3") ||
                            ""}
                        </p>
                      </div>
                    </div>
                    {isDelete && (
                      <div className="isdelete">
                        <h2 className="jakarta">
                          Vuoi eliminare {activeItem?.name}
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
                              onClick={() => deleteHandler(activeItem)}
                              className="delete-btn btn"
                            >
                              Seleziona
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setActiveItem(item);
                        setIsDelete(true);
                      }}
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
