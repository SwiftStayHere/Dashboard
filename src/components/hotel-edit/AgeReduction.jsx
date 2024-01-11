import Select from "../basic/Select";
import Input from "./Input";

const engToItl = {
  "Select Board type": "Apply to",
  "Age Limit": "Maximum Age",
  Discount: "Discount",
};

export default function AgeReduction({ data, handler }) {
  return (
    <div className="breakdown-inner">
      <div className="item">
        <label htmlFor="">Apply to</label>
        <Select
          data={[
            "All types of pension",
            "Full Board",
            "Half Board",
            "Bed & Breakfast",
          ]}
          handler={(e) => handler(e, data.reductionId, "boardType")}
          activeValue={data.boardType || "All types of pension"}
        />
      </div>
      <div className="item">
        <label htmlFor="">Maximum Age</label>
        <Input
          type="number"
          handler={(e) => handler(e, data.reductionId, "agelimit")}
          d={{ value: data.agelimit, label: "Enter Maximum Age" }}
        />
      </div>
      <div className="item klsajflkjsdfjlkklsadflkjsdf">
        <label htmlFor="">Discount</label>
        <span>%</span>
        <Input
          type="number"
          handler={(e) => handler(e, data.reductionId, "discount")}
          d={{ value: data.discount, label: "Enter Discount" }}
        />
      </div>
    </div>
  );
}
