import React, { useEffect, useState } from 'react'
import Input from './Input'
import TimeSlot from './TimeSlot'

const TransportDetails2 = (currentBooking,t,i) => {
    const [dataRendered,setDataRendered] = useState(false);
  const [adultTrans,setAdultTrans] = useState("");
  const [childTrans,setChildTrans] = useState("");
  const [bagTrans,seBagTrans] = useState("");
  const [transInp,setTransInp] = useState(t?.transportId);
  const [price,setPrice] = useState(0);
  const [transSub,setTransSub] = useState(`${t?.vehiceBrand} - ${t?.state}`);
    useEffect(()=>{
        setDataRendered(false);
        // var flag = false;
        // make flag true if timing array object contains currentBooking?.dates[0].checkIn
        // add the timing object cost + cost when flag true in each case using ternary
        var AdultCost = 0;
        setPrice(0);
        for(let l =0;l<t?.pricing.length;l++){
            if(t?.pricing[l].name=="Adulti"){
                AdultCost = t?.pricing[l].cost;
            }
            else if(t?.pricing[l].name=="Bagagli"){
                setPrice(price + (t?.pricing[l].cost * currentBooking?.bags))//for bags
            }
        }
        for(let k=0;k<currentBooking?.guestDetails.length;k++){//per room
            for(let l=0;l<currentBooking?.guestDetails[k].child;l++){//per child in 1 room
                var found =AdultCost;
                for(let x =0;x<t?.pricing.length;x++){//per age reduction
                    if(t?.pricing[x].name=="Bambini" && age>=currentBooking?.guestDetails[k].childAge[l]){
                        found = t?.pricing[x].cost;
                        break;
                    }
                }
                setPrice(price + found);
            }
                setPrice(price + (currentBooking?.guestDetails[k].adult * AdultCost))//per total adult in 1 room
        }
        setDataRendered(true);
    },[])
  return dataRendered && (
    <div className="option">
    <div className="option-left">
        <div className="option-left-item">
          <span>Transporto Option {i+1}</span>
          <Input data={{value: transInp}} />
          <div>{transSub}</div>
        </div>
        <div className="option-left-item">
        <span>Prezzo Totale</span>
          <Input data={{value: price}} />
        </div>
    </div>
      <div className="option-right">
      <TimeSlot
        data={{
          name: `${i+1}`,
          times: t?.hours.map(obj => obj.value),
        }}
      />
    </div>
  </div>
  )
}

export default TransportDetails2
