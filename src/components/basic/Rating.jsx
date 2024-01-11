import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function Rating({ rate }) {
  const [rating, setRating] = useState(5);

  return (
    <ul className="rating">
      {Array.from({ length: rate }, (d, i) => (
        <li key={i}>
          <AiFillStar />
        </li>
      ))}
    </ul>
  );
}
