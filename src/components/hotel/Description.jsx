import { useState } from "react";

export default function Description({ description, title, max }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const maxWords = max || 50;
  const truncatedDescription = description
    .split(" ")
    .slice(0, maxWords)
    .join(" ");

  return (
    <div className=" description">
      {title && <h4>{title}</h4>}
      <p>
        {" "}
        {showFullDescription
          ? description
          : (description?.length > 50 && truncatedDescription + "...") ||
            truncatedDescription}
      </p>
      <button onClick={() => setShowFullDescription(!showFullDescription)}>
        {description?.length > 50 &&
          ((showFullDescription && "Mostra di meno") || "Mostra di più")}
      </button>
    </div>
  );
}
