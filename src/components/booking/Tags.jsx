import { useState, useRef, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import values from "../../../values";

export default function Tags({
  activeValue,
  userId,
  bookingDetailsId,
  setUserTags,
}) {
  const [tags, setTags] = useState(["tag1", "$tag2"]);
  const [primaryTags, setPrimaryTags] = useState([
    "Tag 01",
    "Tag 02",
    "Tag 03",
  ]);
  const [isDorp, setIsDrop] = useState(false);
  const ref = useRef(null);
  const [addTagVal, setAddTagVal] = useState("");
  const [value, setValue] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [userCookie, setUserCookie] = useState();
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const url =
    `${values.url}`;
  function removeDuplicates(array) {
    let data = [...new Set(array)];
    setTags(data);
  }
  const GetAllTags = () => {
   
    let tempArr = [];
    if (userId != undefined && bookingDetailsId == undefined){
      console.log("Tags",userId)
      axios
        .get(`${url}/booking/userTags/${userId}`)
        .then((resp1) => {
       
          tempArr = [...resp1.data];
          removeDuplicates(tempArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
      if (userId != undefined && bookingDetailsId != undefined) {
        axios
          .get(`${url}/booking/userTags/${userId}`)
          .then((resp1) => {
       
            tempArr = [...resp1.data];
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`${url}/booking/bookingTag/${bookingDetailsId}`)
          .then((resp2) => {
           
            tempArr = [...tempArr, ...resp2.data];

            removeDuplicates(tempArr);
          })
          .catch((err) => {
            console.log("error");
          });
      }
  };
  const AddTagBooking = (tag) => {
    axios
      .put(
        `${url}/booking/bookingTag`,
        { Id: bookingDetailsId, tag: tag },
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const AddTagToAll = (tag) => {
    axios
      .put(
        `${url}/booking/bookingTag`,
        { userId: userId, tag: tag },
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log("error");
      });
    axios
      .put(
        `${url}/booking/userTags`,
        { userId: userId, tag: tag },
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        console.log("updated");
        GetAllTags();
      })
      .catch((err) => {
        console.log("error");
      });
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDrop(false);
      }
    });
    const user = Cookies.get("login").split(",");
    if (user[1] == '"role":"user"') {
      setIsUser(true);
    }
    // setPrimaryTags(renderPryTags());
    GetAllTags();
    renderPryTags();
  }, [userId, bookingDetailsId]);
  useEffect(() => {
    setIsDrop(false);
  }, [activeValue]);

  async function renderPryTags() {
    axios
      .get(`${values.url}/tag`)
      .then((response) => {
        setPrimaryTags(
          response.data.filter((tag) => tag.catagory === "bookingServices")
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  async function deletePryTags(id) {
    try {
      const res = await axios.delete(`${values.url}/tag/${id}`, {
        headers: {
          token,
        },
      });
      renderPryTags();
    } catch (err) {
      console.log(err);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      // AddTagToAll(value);
      console.log(primaryTags);
      if (primaryTags.some((item) => item.name == value)) {
        console.log("includes");
        if (bookingDetailsId) {
          AddTagBooking(value);
        }
      } else {
        console.log("not");
        AddTagToAll(value);
      }
      setTags((prev) => {
        return [...prev, value];
      });
      if (setUserTags) {
        setUserTags((prev) => {
          return [...prev, value];
        });
      }
      setValue("");
    }
  };
  const addTagSubmitHandler = async (e) => {
    e.preventDefault();
    if (addTagVal) {
      try {
        const { data } = await axios.post(
          `${values.url}/tag`,
          {
            tag: addTagVal,
            tagCat: "bookingServices",
          },
          {
            headers: {
              token,
            },
          }
        );
        console.log(data);
        renderPryTags();
      } catch (error) {
        console.log(error);
      }
      setAddTagVal("");
    }
  };

  const deleteHandler = (e) => {
    const updatedTags = tags.filter((_, i) => i !== e);
    setTags(updatedTags);
    if (setUserTags) {
      setUserTags((prev) => {
        return updatedTags;
      });
    }
  };

  const tagInput = (e) => {
    e.target.parentElement.nextSibling.style.display = "inline-block";
    e.target.parentElement.nextSibling.children[0][0].focus();
  };
  return (
    <form onSubmit={submitHandler} action="/">
      <div className="form-group tags">
        <label htmlFor="tag">Tag</label>
        <div className="form-group-wrp">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onClick={() => setIsDrop(true)}
            value={value}
            type="text"
          />
          {isDorp && (
            <ul className="dropdown">
              <GrClose onClick={() => setIsDrop(false)} className="closeDrop" />
              {primaryTags.map((d, i) => (
                <li key={i}>
                  <div onClick={() => setValue(d.name)}>{d.name}</div>
                  {!isUser && <FaTrash onClick={(e) => deletePryTags(d._id)} />}
                </li>
              ))}
              {!isUser && (
                <>
                  <li key="-1" className="addTag">
                    <div
                      onClick={(e) => {
                        tagInput(e);
                      }}
                    >
                      + Aggiungi Tag
                    </div>
                  </li>
                  <li key="-2" className="addTagInput">
                    <form action="/">
                      <input
                        onChange={(e) => {
                          setAddTagVal(e.target.value);
                        }}
                        onClick={() => setIsDrop(true)}
                        name="tag"
                        value={addTagVal}
                        type="text"
                        placeholder="Nome Tag"
                      />
                      <button className="addIcon" onClick={addTagSubmitHandler}>
                        <BiPlus />
                      </button>
                    </form>
                  </li>
                </>
              )}
            </ul>
          )}
          <button className="icon" onClick={() => {}}>
            <BiPlus />
          </button>
          {tags.map((d, i) => (
            <span className={(d[0] === "$" && "border") || ""} key={i}>
              {d.replace("$", "")}
              <button onClick={(e) => deleteHandler(i)}>
                <GrClose />
              </button>
            </span>
          ))}
        </div>
      </div>
    </form>
  );
}
