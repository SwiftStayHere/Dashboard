import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import AgeEdit from "../hotel/AgeEdit";
import DetailsImgs from "./DetailsImgs";
import DetailsInputs from "./DetailsInputs";
import Rating from "./Rating";
import TagInput from "./TagInput";

export default function HotelDetailsForm({ data, setData, fixtData }) {
  const [existingStrengths, setExistingStrengths] = useState([]);
  const [existingServices, setExistingServices] = useState([]);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    (async () => {
      try {
        const { data: tags } = await axios.get(`${values.url}/tag`, {
          headers: {
            token,
          },
        });

        setExistingServices(
          tags.filter((item) => item.catagory === "hotelServices") ?? []
        );
        setExistingStrengths(
          tags.filter((item) => item.catagory === "hotelStrengths") ?? []
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="hotel-details-form">
      <div className="images">
        <h4>Hotel images</h4>
        <p>Add one or more images of the hotel for the user to see</p>
        <DetailsImgs data={data} setData={setData} />
      </div>
      <div className="hotel-form-details">
        <h4>Hotel details</h4>
        <p>Enter or edit your hotel details below</p>

        <DetailsInputs fixtData={fixtData} data={data} setData={setData} />
      </div>
      <div className="hotel-details-form-rating">
        <h4>Stars Structure</h4>
        <p>
          Click from left to right to select the number of stars for the property.
        </p>
        <Rating data={data} setData={setData} />
      </div>

      <div className="service">
        <h4>Services Details</h4>
        <p>Add a description about the hotel amenities</p>
        <div className="hotel-form-details-item full">
          <label htmlFor="">Services Details</label>
          <div className="inner">
            <textarea
              name="services"
              placeholder="Enter the description of the Hotel's services"
              value={data?.serviceDetails}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    serviceDetails: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="hotel-edit-bottom">
        <h4>Services Included</h4>
        <TagInput
          tags={existingServices}
          handler={setExistingServices}
          name="hotelServices"
          setData={setData}
          data={data}
          fixtData={fixtData}
        />
        <h4>Punti di forza</h4>
        <TagInput
          tags={existingStrengths}
          handler={setExistingStrengths}
          name="hotelStrengths"
          setData={setData}
          data={data}
          fixtData={fixtData}
        />
      </div>

      <div className="service age-edit-wrp">
        <h4>Age reductions</h4>
        <p>
        These values ​​will be taken as default for all hotel offers. However, they can also be modified for individual offers
        </p>
        <AgeEdit isEdit={true} data={data} setData={setData} />
      </div>
    </div>
  );
}
