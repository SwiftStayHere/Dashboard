import { MdLocationOn } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import Rating from "../basic/Rating";
import HotelItemImg from "./HotelItemImg";
import Offers from "./Offers";
import Tags from "./Tags";

const calculateLowestAndHighestPrices = (offers) => {
  let lowestPrice = Infinity; // Initialize with a high value
  let highestPrice = -Infinity; // Initialize with a low value

  for (const offer of offers) {
    const { minStay, breakdown } = offer;

    for (const item of breakdown) {
      const { price, priceType } = item;

      if (priceType === "Totale offerta") {
        const adjustedPrice = price / minStay; // Divide price by minStay
        lowestPrice = Math.min(lowestPrice, adjustedPrice);
        highestPrice = Math.max(highestPrice, adjustedPrice);
      } else {
        lowestPrice = Math.min(lowestPrice, price);
        highestPrice = Math.max(highestPrice, price);
      }
    }
  }
  if (!(lowestPrice && highestPrice)) {
    return `${lowestPrice}€~${highestPrice}€ `;
  } else {
    return "Nessuna Offerta";
  }
};

export default function HotelItem({ hotelData }) {
  return (
    <div className="hotel-item">
      <div className="hotel-item-left">
        <HotelItemImg imas={hotelData.images} />
        <div className="info">
          <div className="top">
            <Link to={`/hotel/${hotelData._id}`}>
              <h4>{hotelData.name}</h4>
            </Link>
            {hotelData?.disabled && (
              <span
                style={{
                  color: "#ff9500",
                }}
              >
                ( Disabilitato)
              </span>
            )}
            <Rating rate={hotelData.rating} />
          </div>
          <p>
            <span>
              <MdLocationOn /> {hotelData.address}
            </span>

            <span className="loca">
              <RxDotFilled />
              {/* 1.7 km from centre */}
              {hotelData.distance.map((dist, index) => (
                <span key={index}>
                  {dist.distance + " " + dist.label}{" "}
                  {hotelData.distance.length !== index + 1 ? " - " : ""}
                </span>
              ))}
            </span>
          </p>
          <Tags tag={[...hotelData.strengths, ...hotelData.services]} />
          <Offers offer={hotelData.offers} />
        </div>
      </div>
      <div className="hotel-item-right">
        <div className="hotel-item-right-top">
          <span>Range di Prezzi</span>
          <strong>{calculateLowestAndHighestPrices(hotelData.offers)}</strong>
        </div>
        <div className="hotel-item-right-bottom">
          <Link to={`/hotel/${hotelData._id}`} className="btn">
            Vedi Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}
