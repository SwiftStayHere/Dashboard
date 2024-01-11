import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import Select from '../basic/Select'
import ChildItem from './ChildItem'
import Item from './Item'

const Room = ({
  room,
  i,
  data,
  currentBooking,
  updateFinal3,
  newprici,
  onTempiChange,
  className,
  onDiscountChange,
}) => {
  const [priceChanges, setPriceChanges] = useState(0);
  const [userAdded, setUserAdded] = useState("price");
  const [thirdInputLable, setThirdInputLable] = useState(`"Select one option"`);
  const  priChange =(d, i, setValue)=>{
    if(/^[0-9]+(\.[0-9]*)?$/.test(d)){if(thirdInputLable=="Sconto Totale sulla Stanza" && d>100){
      setValue(priceChanges)
    }
    else {
    setPriceChanges(d)
    }}else{
      setValue(priceChanges)
    }
  }
  const updateLable = (d) => {
    if (d == "€") {
      setThirdInputLable("Prezzo stanza");
      setUserAdded("price");
    } else {
      setThirdInputLable("Sconto Totale sulla Stanza");
      setUserAdded("discount");
    }
  };

  let calculatedNights = Math.abs(
    (new Date(currentBooking?.checkInDate) -
      new Date(currentBooking?.checkOutDate)) /
      (1000 * 60 * 60 * 24)
  );
  const calculateNightsNew = (minStay, maxStay) => {
    if (minStay === maxStay) {
      return maxStay;
    } else {
      if (calculatedNights < minStay) {
        calculatedNights = minStay;
      } else if (calculatedNights > maxStay) {
        calculatedNights = maxStay;
      }
      return calculatedNights;
    }
  };
  const [board, setBoard] = useState(currentBooking?.boardType);
  const [initialPrice, setInitialPrice] = useState(
    currentBooking?.dates[0].price
  );
  const [totPrice, setTotPrice] = useState(
    () => Number(initialPrice) * (room.gust.length + room.gust2.length)
  );
  const [newPrice, setNewPrice] = useState(0);
  const [newPrice2, setNewPrice2] = useState(0);
  const updateFinal = (index, newValue) => {
    setNewPrice((prevFinal) => {
      return {
        ...prevFinal,
        [index]: newValue,
      };
    });
  };
  const updateFinal2 = (index, newValue) => {
    setNewPrice2((prevFinal) => {
      return {
        ...prevFinal,
        [index]: newValue,
      };
    });
  };
  const breakDownTypeChecker = (board) => {
    if (board.startsWith("Pensione completa")) {
      return 0;
    } else if (board.startsWith("Mezza pensione")) {
      return 1;
    } else if (board.startsWith("Bed & Breakfast")) {
      return 2;
    }
  };
  const [oldTotPrice, setOldTotPrice] = useState(
    () => Number(initialPrice) * (room.gust.length + room.gust2.length)
  );
  const [oldNewPrice, setOldNewPrice] = useState(
    () => Number(initialPrice) * (room.gust.length + room.gust2.length)
  );
  useEffect(() => {
    if (
      board != undefined &&
      currentBooking != undefined &&
      currentBooking != null
    ) {
      calculateNightsNew(
        currentBooking?.dates[0].actualOffer?.minStay,
        currentBooking?.dates[0].actualOffer?.maxStay
      );
      setInitialPrice(
        currentBooking?.dates[0].actualOffer?.minStay ===
          currentBooking?.dates[0].actualOffer?.maxStay
          ? currentBooking?.dates[0].actualOffer?.breakdown[
              breakDownTypeChecker(board)
            ].price
          : (!(
              currentBooking?.dates[0].actualOffer?.minStay ===
              currentBooking?.dates[0].actualOffer?.maxStay
            )
              ? currentBooking?.dates[0].actualOffer?.breakdown[
                  breakDownTypeChecker(board)
                ]?.price !== 0
                ? currentBooking?.dates[0].actualOffer?.breakdown[
                    breakDownTypeChecker(board)
                  ]?.price
                : currentBooking?.dates[0].actualOffer?.breakdown[
                    breakDownTypeChecker(board)
                  ].price
              : currentBooking?.dates[0].actualOffer?.breakdown[
                  breakDownTypeChecker(board)
                ].price) * calculatedNights
      );

      setTotPrice(
        Number(
          currentBooking?.dates[0].actualOffer?.minStay ===
            currentBooking?.dates[0].actualOffer?.maxStay
            ? currentBooking?.dates[0].actualOffer?.breakdown[
                breakDownTypeChecker(board)
              ].price
            : (!(
                currentBooking?.dates[0].actualOffer?.minStay ===
                currentBooking?.dates[0].actualOffer?.maxStay
              ) &&
              currentBooking?.dates[0].actualOffer?.id ===
                currentBooking?.dates[0].actualOffer?.id
                ? currentBooking?.dates[0].actualOffer?.breakdown[
                    breakDownTypeChecker(board)
                  ]?.price !== 0
                  ? currentBooking?.dates[0].actualOffer?.breakdown[
                      breakDownTypeChecker(board)
                    ]?.price
                  : currentBooking?.dates[0].actualOffer?.breakdown[
                      breakDownTypeChecker(board)
                    ].price
                : currentBooking?.dates[0].actualOffer?.breakdown[
                    breakDownTypeChecker(board)
                  ].price) * calculatedNights
        ) *
          (room.gust.length + room.gust2.length)
      );
    }
  }, [board]);
  useEffect(() => {
    if (totPrice != undefined && totPrice != null) {
      onTempiChange(totPrice);
    }
  }, [totPrice]);

  useEffect(()=>{
    if(priceChanges!= undefined && priceChanges != null){
      if(userAdded == "price" ){
        onDiscountChange(parseInt(priceChanges))
      }
      else{
         onDiscountChange(parseInt((priceChanges * totPrice) / 100));
      }
    }
  },[priceChanges,userAdded])
  //  useEffect(()=>{
  //   setFinalNewPrice(finalNewPrice+newPrice-oldNewPrice);
  //   setOldNewPrice(newPrice)
  //  },[newPrice])
  function sumValues(obj) {
    // Sum the values in the adult array
    if (obj != undefined) {
      const sumAdult = obj.adult
        ? obj.adult?.reduce((acc, value) => acc + value, 0)
        : 0;

      // Sum the values in the child array
      const sumChild = obj.child
        ? obj.child?.reduce((acc, value) => acc + value, 0)
        : 0;

      // Return an object with the sums
      return sumAdult + sumChild;
    }
    return 0;
  }
  const getRoomType = (ad, ch) => {
    if (ad + ch == 0) {
      return "Vuota";
    } else if (ad + ch == 1) {
      return "Singola";
    } else if (ad + ch == 2) {
      return "Doppia";
    } else if (ad + ch == 3) {
      return "Tripla";
    } else {
      return "Quadrupla";
    }
  };
  return (
    <div key={i} className="details-suggest-body-main ">
      <div className="top" style={{backgroundColor : className=="green"? "#EBFAEF":"#E6EFF7"}}>
        <div className="left">
          <h4 style={{color : className=="green"? "#34C759":""}}>{`Stanza ${i+1}`}</h4>{" "}
          {data?.rooms?.length > 1 && (
            <button onClick={() => data.deleteRoom(room.id)}>
              <RiDeleteBin2Fill />
            </button>
          )}
        </div>

        <button onClick={data.addHotelHandler} style={{color : className=="green"? "#34C759":""}}>
          <AiOutlinePlus />
          Aggiungi una nuova Stanza
        </button>
      </div>
      <div className="item-wrp">
        <Item
          data={{
            name: "Tipo di Stanza",
            options: ["Singola", "Doppia", "Tripla", "Quadrupla"],
            activeValue:
              i > 1 ? "Vuota" : getRoomType(room.gust.length, room.gust2.length),
          }}
        />
        <Item
          data={{
            name: "Pacchetto",
            options: (
              currentBooking?.dates[0].actualOffer?.breakdown || []
            ).map((breakdown) => {
              const optionText =
                breakdown.price === 0
                  ? `${breakdown.name} (non disponibile)`
                  : breakdown.name;
              return optionText;
            }),
            handler: setBoard,
            activeValue: board,
          }}
        />
        <div className="thirdInput">
          <Select data={["€", "%"]} handler={updateLable} activeValue={"€"} />
          <Item
            data={{
              name:`Sconto Totale Stanza ${i+1}`,
              value: priceChanges,
              handler: priChange,
            }}
          />
        </div>
      </div>
      {room?.gust.map((g, j) => (
        <ChildItem
          key={j}
          type="Adulto"
          prices={currentBooking?.dates[0].price}
          currentBooking={currentBooking}
          totPrice={totPrice}
          setTotPrice={setTotPrice}
          newPrice={newPrice}
          setNewPrice={setNewPrice}
          room={room}
          data={data}
          board={board}
          initialPrice={initialPrice}
          onTempChange={(newValue) => updateFinal3(i, j, newValue, "Adulto")}
        />
      ))}
      {room?.gust2.map((g, j) => (
        <ChildItem
          key={i + room?.gust.length}
          type="Bambino"
          prices={currentBooking?.dates[0].price}
          childAges={room?.gust2[j]}
          currentBooking={currentBooking}
          totPrice={totPrice}
          setTotPrice={setTotPrice}
          newPrice={newPrice}
          setNewPrice={setNewPrice}
          data={data}
          room={room}
          board={board}
          initialPrice={initialPrice}
          onTempChange={(newValue) => updateFinal3(i, j, newValue, "Bambino")}
        />
      ))}

      <div className="invoice">
        <div className="left">
          <button onClick={() => data.addGustHandler(room.id)}>
            <AiOutlinePlus /> Aggiungi Ospite
          </button>
        </div>
        <div className="right">
          <div className="invoice-item">
            <span>
              {room.gust.length + room.gust2.length} Person{room.gust.length + room.gust2.length ==1 ? "a" : "e"} ({room.gust.length}{" "}
              Adult{room.gust.length ==1?"o":"i"} + {room.gust2.length} Bambin{room.gust2.length==1?"o":"i"}){" "}
            </span>
            <strong>{totPrice}€</strong>
          </div>
          <div className="invoice-item discount">
            <span>
              {room.gust2.length} Bambin{room.gust2.length==1?"o":"i"} (
              {room.gust2.map((g, i) => {
                if (i != room.gust2.length - 1) {
                  return g + "-";
                } else {
                  return g;
                }
              })}
              ){" "}
            </span>
            <strong>{sumValues(newprici) - totPrice}€</strong>
          </div>
          {userAdded == "price" && (
            <div className="invoice-item userAddedPrice">
              <span>Sconto Applicato alla Stanza </span>
              <strong>-{priceChanges}€</strong>
            </div>
          )}
          {userAdded == "discount" && (
            <div className="invoice-item discount">
              <span>Added Discount </span>
              <strong>-{(priceChanges * totPrice) / 100}€</strong>
            </div>
          )}
          <div className="invoice-item costi">
            <span>Prezzo Finale della ROOM TYPE</span>
            <strong style={{ color: '#005cab' }}>
  {sumValues(newprici) +
    (userAdded === 'price'
      ? Number(0 - priceChanges)
      : Number(0 - (priceChanges * totPrice) / 100))}
  €
</strong>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Room






