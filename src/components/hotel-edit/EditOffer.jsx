import moment from "moment/moment";
import { useState } from "react";
import { ImGlass } from "react-icons/im";
import { LuEdit } from "react-icons/lu";
import img1 from "../../assets/images/create.svg";
import img from "../../assets/images/discount.svg";
import AddNewOffer from "./AddNewOffer";

export default function EditOffer({ data, setData }) {
  const [items, setItems] = useState([1]);

  const submitHandler = () => {
    setItems((prev) => {
      return [...prev, 1];
    });
    setIsAdd(false);
  };

  const [isAdd, setIsAdd] = useState(false);
  const [isAddNewOfferClicked, setIsAddNewOfferClicked] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState(null);
  return (
    <div className="edit-offer">
      {data?.offers &&
        data?.offers.map((offer, i) => {
          return (
            <div key={i} className="edit-offer-item">
              <div className="edit-offer-item-top">
                <div className="edit-offer-item-top-left">
                  <img src={img} alt="" />
                  <div className="content">
                    <h4>{offer.name}</h4>
                    <span>
                      Dal {moment(offer.startDate).format("Do MMMM ")} -{" "}
                      {moment(offer.endDate).format("Do MMMM YY")}
                    </span>
                  </div>
                </div>

                <div className="edit-btn">
                  <button
                    onClick={() => {
                      setOfferToEdit(offer);
                      setIsAdd(true);
                    }}
                  >
                    <LuEdit /> Modifica
                  </button>
                </div>
              </div>
              <div className="edit-offer-item-body">
                <div className="conditions">
                  <h4>Condizioni</h4>
                  <ul className="conditions-wrp">
                    <li>&#x2713; Minimo {offer.minStay} Notti </li>
                    <li>&#x2713; Massimo {offer.maxStay} Notti </li>
                  </ul>
                </div>
                <div className="conditions">
                  <h4>
                    <ImGlass />
                    {offer.beverageAvailability === "Incluse"
                      ? "Bevande Incluse"
                      : "Bevande non Incluse"}
                  </h4>
                </div>

                <div className="price">
                  <h4>Prezzi</h4>
                  <ul className="price-items">
                    {offer.breakdown.map((pr, i) => (
                      <li key={i}>
                        <p>{pr.name}</p>
                        <strong>
                          {pr.currency + pr.price}{" "}
                          <span>
                            /{" "}
                            {(pr.priceType === 1 && "Costo giornaliero") ||
                              "Totale offerta"}
                          </span>
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="price">
                  <h4>Riduzioni Età</h4>
                  <ul className="price-items">
                    {offer.ageReduction.map((ageRed, i) => (
                      <li key={i}>
                        <p>
                          Eta {i === 0 ? 0 : offer.ageReduction[i - 1].agelimit}{" "}
                          - {ageRed.agelimit}
                        </p>
                        <strong>
                          $120 <span>/{ageRed.boardType}</span>
                        </strong>
                        <p className="discount">{ageRed.discount}% Discount</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      {(isAddNewOfferClicked || offerToEdit) && (
        <AddNewOffer
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          isAddNewOfferClicked={isAddNewOfferClicked}
          offer={offerToEdit}
          setOffer={setOfferToEdit}
          setIsAddNewOfferClicked={setIsAddNewOfferClicked}
          submitHandler={submitHandler}
          data={data}
          setData={setData}
        />
      )}
      <button
        onClick={() => {
          setIsAddNewOfferClicked(true);
          setIsAdd(true);
        }}
        className="edit-offer-item"
      >
        <img src={img1} alt="" />
        <h4>Create Offer</h4>
        <p>Click here to create a new offer manually</p>
      </button>
    </div>
  );
}
