import React, { useEffect, useState } from "react";
import Select from "../basic/Select";
import Input from "./Input";
import Item from "./Item";

const ChildItem = ({
  key,
  type,
  childAges,
  currentBooking,
  totPrice,
  setTotPrice,
  newPrice,
  setNewPrice,
  room,
  data,
  board,
  initialPrice,
  onTempChange
}) => {
  const [oldNewPrice, setOldNewPrice] = useState(initialPrice);
  const [price, setPrice] = useState(initialPrice);
  const [disc, setDiscount] = useState(null);
  const [guestType, setGuestType] = useState(type);
  const [thirdInputLable, setThirdInputLable] = useState("Select one option");
  const [childAge, setChildAge] = useState(childAges);
  const [thirdSign, setThirdSign] = useState("€");
  useEffect(() => {
    if (currentBooking != null && currentBooking != undefined) {
      localStorage.setItem("board", currentBooking?.boardType);
      setDiscount(0);
      for (let i = 0; i < currentBooking?.dates[0].actualOffer?.ageReduction?.length; i++) {
        if (
          currentBooking?.dates[0].actualOffer?.ageReduction[i]?.agelimit >= childAge &&
          (currentBooking?.dates[0].actualOffer?.ageReduction[i]?.boardType == "Tutte le opzioni" ||
            currentBooking?.dates[0].actualOffer?.ageReduction[i]?.boardType == currentBooking?.boardType)
        ) {
          if (currentBooking?.dates[0].actualOffer?.ageReduction[i]?.discount < 0) {
            setDiscount(
              Number(currentBooking?.dates[0].actualOffer?.ageReduction[i]?.discount) *
                Number(currentBooking?.periodo[0])
            );
          } else {
          setDiscount(Number(currentBooking?.dates[0].actualOffer?.ageReduction[i]?.discount));
          }
          break;
        }
      }
    }
  }, [currentBooking, childAge, totPrice, type, board]);
  useEffect(()=>{
    onTempChange((Number(price) - (guestType =="Bambino" ? 
            (Number(thirdSign == "%" ? price * Math.min(1, disc / 100) : disc)) *
            (currentBooking?.dates[0].actualOffer?.maxStay == currentBooking?.dates[0].actualOffer?.minStay
              ? Number(
                  Number(currentBooking?.periodo[0]) / currentBooking?.dates[0].actualOffer?.minStay
                )
              : Number(currentBooking?.periodo[0])):0)))
  },[(Number(price) - (guestType =="Bambino" ? 
            (Number(thirdSign == "%" ? price * Math.min(1, disc / 100) : disc)) *
            (currentBooking?.dates[0].actualOffer?.maxStay == currentBooking?.dates[0].actualOffer?.minStay
              ? Number(
                  Number(currentBooking?.periodo[0]) / currentBooking?.dates[0]?.actualOffer?.minStay
                )
              : Number(currentBooking?.periodo[0])):0))])
  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const updateLable = (d) => {
    if (d == "€") {
      setThirdInputLable("Prezzo stanza");
      setThirdSign("€");
    } else {
      setThirdInputLable("Sconto Totale sulla Stanza");
      setThirdSign("%");
    }
  };
  const checkAge = (d, i, setValue) => {
    if(/^[0-9]+$/.test(d)){
      if (d >= 0 && d < 18) {
        setChildAge(d);
      } else if (d == "17") {
        setValue(17);
      } else {
        setValue("17");
        setChildAge(17);
      }
    }
    else{
      setValue(childAge)
    }
  };
  const checkAdultPrice = (d, i, setValue) => {
    console.log(d)
    if(/^[0-9]+(\.[0-9]*)?$/.test(d)){
      if (d >= 0 && d < 50000) {
        setPrice(d);
      } 
      else {
        setPrice(0);
      }
    } else{
      setValue(price)
    }
    
  };
  const updateGuest = (d) => {
    if (d == "Bambino" && type == "Adulto") {
      setGuestType("Bambino")
        data.typeAdult(room.id);
    } else if(d=="Adulto"  && type == "Bambino"){
      setGuestType("Adulto")
        data.typeChild(room.id, childAge);
    }
  };
  const discCheck = (d,i,setValue) =>{
    if(/^[0-9]+(\.[0-9]*)?$/.test(d)){
      if(thirdInputLable=="Sconto Totale sulla Stanza" && d>100){
      setValue(disc)
    }
    else {
    setDiscount(d)
    }}else{
      setValue(disc)
    }
  }
  return (
    <div className="item-wrp child">
      <Item
        data={{
          name: "Tipo di Ospite",
          options: ["Bambino", "Adulto"],
          handler: updateGuest,
          activeValue: guestType,
        }}
      />
      {(guestType == "Bambino" && (
        <div className="childOpt">
          <Item
            data={{
              name: "Età",
              value: childAge,
              handler: checkAge,
              placeholder: "0-17",
            }}
          />
          <div className="thirdInput">
            <Select
              data={["€", "%"]}
              handler={updateLable}
              activeValue={thirdSign}
            />
            {disc != null && (
              <Item
                data={{
                  name: thirdInputLable,
                  value: disc,
                  handler: discCheck,
                }}
              />
            )}
          </div>
        </div>
      )) || (
        <div className="adultCost">
          {
            <Item
              data={{
                name: "Prezzo Adulto",
                value: price,
                handler: checkAdultPrice,
              }}
            />
          }
          <span>€</span>
        </div>
      )}

      <div className="cost">
        <small>Prezzo</small>
        <strong>
          €
          {(Number(price) - (guestType =="Bambino" ? 
            (Number(thirdSign == "%" ? price * Math.min(1, disc / 100) : disc)) *
            (currentBooking?.dates[0].actualOffer?.maxStay == currentBooking?.dates[0].actualOffer?.minStay
              ? Number(
                  Number(currentBooking?.periodo[0]) / currentBooking?.dates[0].actualOffer?.minStay
                )
              : Number(currentBooking?.periodo[0])):0))}
        </strong>
      </div>
    </div>
  );
};

export default ChildItem;
