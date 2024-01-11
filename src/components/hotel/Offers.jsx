import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import img from "../../assets/images/discount.svg";

export default function Offers({ offer }) {
  const [offers, setOffers] = useState([]);
  const [trn, setTrns] = useState(0);
  useEffect(() => {
    setOffers(offer);
  }, [offer]);
  return (
    <>
      {(offer && offer?.length && (
        <button
          disabled={!(trn > 0)}
          onClick={() => setTrns(trn - 1)}
          className="offers-btn"
        >
          <FaAngleLeft />
        </button>
      )) ||
        ""}

      <ul className="offers">
        {offers.map((d, i) => (
          <li
            style={{ transform: `translateX(-${trn * 110}%)` }}
            className="offers-item"
            key={i}
          >
            <div className="offers-item-left">
              <img src={img} alt="" />
            </div>
            <div className="offers-item-right">
              <h5>{d.name}</h5>
              <p>
                Dal {moment(d.startDate).format("Do MMMM ")} -{" "}
                {moment(d.endDate).format("Do MMMM YY")}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button
        disabled={!(trn < offers.length - 3)}
        onClick={() => setTrns(trn + 1)}
        className="offers-btn"
      >
        <FaAngleRight />
      </button>
    </>
  );
}
