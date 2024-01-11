import React, { useEffect, useState } from "react";
import Input from "./Input";
import TimeSlot from "./TimeSlot";
import Item from "./Item";
import { json } from "react-router-dom";

const TransportDetails = ({ currentBooking, transOb,list, i, transportL, setList }) => {
  // console.log('transOb : ',transOb);
  // console.log('Lists : ',list)
  // console.log("i ",i)
  // console.log(transportL)
  const [t, setT] = useState(null);
  useEffect(()=>{

    if(list[i] != '')
    {
      for(const x of transportL )
      {
        if(x.transportId == list[i])
        {
          setT(x)
          break;
        }
      }
    } else {
      setT(null)
    }
  },[list])
  // console.log("T objd : ",t);
  const [dataRendered, setDataRendered] = useState(false);
  const [adultTrans, setAdultTrans] = useState("");
  const [childTrans, setChildTrans] = useState("");
  const [bagTrans, seBagTrans] = useState("");
  const [carTrans, setCarTrans] = useState("");
  const [transInp, setTransInp] = useState(t?.transportId);
  const [price, setPrice] = useState(null);
  const [priceCalculation, setPriceCalculation] = useState("");
  const [transSub, setTransSub] = useState(
    `${t?.vehicleBrand} - ${t?.state}`
  );
  
  const isDateInRange = (dateStr, startDateStr, endDateStr) => {
    // Convert date strings to Date objects
    const date = new Date(dateStr);
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    // Check if the date is within the specified range
    return startDate <= date && date <= endDate;
  };
  
  const updateTrans = (id) => {
    for (let j = 0; j < transportL.length; j++) {
      if (transportL[j].transportId === id) {
        // setT(transportL[i]);
        
        console.log("Upd : ",list.map((e,ind)=>{
          if(ind==i)return id
          else return e
        }))
        setList(list.map((e,ind)=>{
          if(ind==i)return id
          else return e
        }))
      }
    }
  };

  useEffect(() => {
    console.log("i : ",i,"list : ",list,"TransId : ",transInp)
    setTransInp(t?.transportId)
    setTransSub(`${t?.vehicleBrand} - ${t?.state}`)
    setAdultTrans("")
    setChildTrans("")
    seBagTrans("")  
    setCarTrans("")
    setPrice(null)
    setDataRendered(true);
    if (t == null || t == {}) {
      return;
    }
    setDataRendered(false);
    var calculation = "";
    var totalPrice = 0;
    // var flag = false;
    // make flag true if timing array object contains currentBooking?.dates[0].checkIn
    // add the timing object cost + cost when flag true in each case using ternary
    var AdultCost = 0;
    var checkInCost = 0;
    setPrice(0);
    // Finding ChekcIn Cost
    for (let i = 0; i < t?.timing?.length; i++) {
      if (
        isDateInRange(
          currentBooking?.dates[0].checkIn,
          t?.timing[i].start,
          t?.timing[i].end
        )
      ) {
        checkInCost = t?.timing[i].cost;
        break;
      }
    }
    // console.log("test");
    for (let l = 0; l < t?.pricing.length; l++) {
      if (t?.pricing[l].name == "Adulti") {
        AdultCost = t?.pricing[l].cost;
      } else if (
        t?.pricing[l].name == "Bagagli" &&
        currentBooking?.bags != "Nessuna"
      ) {
        // setPrice(price + (t?.pricing[l].cost * currentBooking?.bags))//for bags
        totalPrice += t?.pricing[l].cost * currentBooking?.bags; //for bags
        // if (calculation !== "") calculation +=  "+";
        seBagTrans(t?.pricing[l].cost + "€x" + currentBooking?.bags);
        // calculation += t?.pricing[l].cost + "€x" + currentBooking?.bags;
      }
    }
    var childStr = ""
    var noAdult = 0; 
    for (let k = 0; k < currentBooking?.guestDetails.length; k++) {
      //per room
      for (let l = 0; l < currentBooking?.guestDetails[k].child; l++) {
        //per child in 1 room
        var found = AdultCost;
        for (let x = 0; x < t?.pricing.length; x++) {
          //per age reduction
          if (
            t?.pricing[x].name == "Bambini" &&
            t?.pricing[x].age >= currentBooking?.guestDetails[k].childAge[l]
          ) {
            found = t?.pricing[x].cost;
            break;
          }
        }
        // setPrice(price + found);
        totalPrice += (found+(currentBooking?.guestDetails[k]?.childAge[l])?checkInCost:0);
        // if (calculation !== "") calculation += "+";
        
        childStr += (((childStr)?'+':'')+(((found+(currentBooking?.guestDetails[k]?.childAge[l])?checkInCost:0)) + "€x1"))
        // calculation += found + "€x1";
      }
      // setPrice(price + (currentBooking?.guestDetails[k].adult * AdultCost)  //per total adult in 1 room
      //                + ((currentBooking?.guestDetails[k].adult+childCheckInCnt) * checkInCost));
      totalPrice +=
      currentBooking?.guestDetails[k].adult * (AdultCost+checkInCost) ; //per total adult in 1 room
      noAdult+=currentBooking?.guestDetails[k].adult;
      // if (calculation !== "") calculation += "+";
      // calculation +=
    }
    setChildTrans(childStr)
    // console.log(childStr)
    setAdultTrans((AdultCost+checkInCost)  +"€x" +noAdult); 
    if (currentBooking?.carSize != "Nessuna") {
      // dimensione auto case
      var carSizePrice = 0;
      for (let i = 0; i < t?.pricing.length; i++) {
        if (t?.pricing[i].name != "Auto") continue;
        const dimeAuto = t?.pricing[i].dimensioneAuto.split(" ");
        if (dimeAuto[0] == "fino") {
          if (Number(currentBooking?.carSize) < Number(dimeAuto[2])) {
            carSizePrice = t?.pricing[i].cost;
            break;
          }
        } else {
          if (Number(currentBooking?.carSize) > Number(dimeAuto[2])) {
            carSizePrice = t?.pricing[i].cost;
            break;
          }
        }
      }
      // setPrice(price + carSizePrice);
      totalPrice += carSizePrice;
      // if (calculation !== "") calculation += "+";
      setCarTrans( carSizePrice + "€x1");
    }
    
    // setPriceCalculation(calculation);
    setPrice(totalPrice);
    setDataRendered(true);
  }, [t,list]);

  return (
    dataRendered && (
      <div className="option">
        <div className="option-left">
          <div className="option-left-item">
            <span>Transporto Option {i + 1}</span>
            {<Input
              data={{
                value: `${(transInp)?transInp:''}`,
                setVal: (value, i, fn) => updateTrans(value),
              }}
            />}
            {/* <input onChange={(e)=>updateTrans(e.target.value)} value={transInp}/> */}
            <div style={{fontSize:'12px'}}>{transSub}</div>
          </div>
          <div style={{width:'150px'}} className="option-left-item">
            <span >Prezzo Totale</span>
            <Input data={{ value: `${(price)?price:''}` }} />
            <div style={{ fontSize:'12px', overflow: "hidden", wordWrap:'break-word', color:'#84818A'}}>
              <span style={{color:'#005CAB'}}> {adultTrans}</span>
              {adultTrans && childTrans && '+'}
              <span style={{color:'#FF42BF'}}> {childTrans}</span>
              {(adultTrans || childTrans) && bagTrans && '+'}
              <span style={{color:'#D5D92E'}}> {bagTrans}</span>
              {(adultTrans || childTrans || bagTrans) && carTrans && '+'}
              <span style={{color:'#FF0000'}}> {carTrans}</span>
              <span>={price}€</span>
            </div>
          </div>
        </div>
        <div className="option-right">
        
          {/* {console.log("Tranas",t)} */}
          {(t?.hours?.length > 0) && (
            <TimeSlot
              data={{
                name: `${i + 1}`,
                times: t?.hours?.map((obj) => obj.value),
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

export default TransportDetails;
