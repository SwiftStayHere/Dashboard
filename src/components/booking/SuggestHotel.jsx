import { useEffect } from "react";
import { useState } from "react";
import Room from "./Room";
import Select from "../basic/Select";
import { BsThreeDotsVertical } from "react-icons/bs";

 const SuggestHotel = ({ data }) => {
//    console.log(data.currentBooking)
 
   const { currentBooking, hotels } = data;
    //  useEffect(() => {
    // //    console.log(currentBooking);
    //  }, []);
   const [userAdded, setUserAdded] = useState("");
   const [finalTotPrice, setFinalTotPrice] = useState(
     () =>
       Number(currentBooking?.dates[0].price) *
       Number(
         Number(currentBooking?.tipi[0]) + Number(currentBooking?.tipi[10])
       )
   );
   const [finalNewPrice, setFinalNewPrice] = useState(
     () =>
       Number(currentBooking?.dates[0].price) *
       Number(
         Number(currentBooking?.tipi[0]) + Number(currentBooking?.tipi[10])
       )
   );
   const [ageRed, setAgeRed] = useState(null);
   const [thirdInputLable, setThirdInputLable] = useState("Select one option");
   const updateLable = (d) => {
     if (d == "€") {
       setThirdInputLable("Prezzo stanza");
       setUserAdded("price");
     } else {
       setThirdInputLable("Sconto Totale sulla Stanza");
       setUserAdded("discount");
     }
   };

   function filterHotelById(hotelsArray, targetId) {
     return hotelsArray.filter((hotel) => hotel.id === targetId);
   }
   const [obj, setObj] = useState([]);
   const [tempValues, setTempValues] = useState([]);
   useEffect(()=>{
        if(obj!=undefined){
            data.setFinali((prev)=>{
                // console.log(sumAllValues(obj))
                return sumAllValues(obj);
            })
        }
   },[obj])
   const handleTempiChange = (newTemp, index) => {
     setTempValues((prev) => {
       const updatedTempValues = [...prev];
       updatedTempValues[index] = newTemp;
       
       return updatedTempValues;
     });
   };
   const updateFinal3 = (index1, index2, newValue, type) => {
     setObj((prev) => {
       let newObj = [...prev];
       //  console.log(index1,index2,type,newValue)
       // Check if the obj array is empty, if so, initialize it with an object with empty arrays
       if (newObj.length === 0) {
         newObj.push({ adult: [], child: [] });
       }

       // Clone the object at the specified index
       let updatedObject = { ...newObj[index1] } || {
         adult: [],
         child: [],
       };
       if (type == "adult") {
         updatedObject.adult = updatedObject.adult || [];

         // Clone the adult array
         let updatedAdultArray = [...updatedObject.adult];

         // Check if the adult array is long enough, if not, fill with zeros
         // while (updatedAdultArray.length <= index2) {
         //   updatedAdultArray.push(0);
         // }

         // Update the value at the specified index in the adult array
         updatedAdultArray[index2] = newValue;

         // Update the object with the modified adult array
         updatedObject.adult = updatedAdultArray;
       }
       if (type == "child") {
         updatedObject.child = updatedObject.child || [];

         // Clone the adult array
         let updatedAdultArray = [...updatedObject.child];

         // Check if the adult array is long enough, if not, fill with zeros
         // while (updatedAdultArray.length <= index2) {
         //   updatedAdultArray.push(0);
         // }

         // Update the value at the specified index in the adult array
         updatedAdultArray[index2] = newValue;

         // Update the object with the modified adult array
         updatedObject.child = updatedAdultArray;
       }
       // Update the obj array with the modified object
       newObj[index1] = updatedObject;
       
       return newObj;
     });

     // Set the state with the updated obj array
   };
   function sumAllValues(arrayOfObjects) {
     // Initialize sums for adult and child arrays
     let sumAdult = 0;
     let sumChild = 0;

     // Iterate through each object in the array
     arrayOfObjects.forEach((obj) => {
       // Sum the values in the adult array
       sumAdult += obj.adult
         ? obj.adult?.reduce((acc, value) => acc + value, 0)
         : 0;

       // Sum the values in the child array
       sumChild += obj.child
         ? obj.child?.reduce((acc, value) => acc + value, 0)
         : 0;
     });

     // Return an object with the total sums
     return sumAdult + sumChild;
   }
   return (
     <>
       <div className="details-suggest-body-top">
         <div className="left">
           <span>Hotel Name</span>
           <Select
             data={hotels}
             activeValue={currentBooking?.dates[0]?.actualName}
           />
         </div>
         <div className="separator"></div>
         <div className="right">
           <span>Final Quote</span>
           <strong>{sumAllValues(obj)}€</strong>

           {sumAllValues(obj) !=
             tempValues?.reduce((acc, temp) => acc + temp, 0) && (
             <span className="delete">
               {tempValues
                 ? tempValues?.reduce((acc, temp) => acc + temp, 0)
                 : 0}
               €
             </span>
           )}

           <button
             onClick={() => {
               data.setIsDelete((prev) => !prev);
             }}
           >
             <BsThreeDotsVertical />
           </button>
           <div className={`btns ${(data.isDelete && "show") || ""}`}>
             <button
               onClick={() => {
                 data.setIsDelete(false);
                 data.setIsSuggest(false);
               }}
             >
               {(data.delete && "Delete") || "close"}
             </button>
           </div>
         </div>
       </div>

       {data.rooms.map((room, i) => (
         <Room
           room={room}
           i={i}
           data={data}
           updateLable={updateLable}
           thirdInputLable={thirdInputLable}
           userAdded={userAdded}
           currentBooking={currentBooking}
           setFinalTotPrice={setFinalTotPrice}
           finalTotPrice={finalTotPrice}
           finalNewPrice={finalNewPrice}
           setFinalNewPrice={setFinalNewPrice}
           updateFinal3={updateFinal3}
           newprici={obj[i]}
           greeni={data.greeni}
           onTempiChange={(newTemp) => handleTempiChange(newTemp, i)}
         />
       ))}
     </>
   );
 };
export default SuggestHotel