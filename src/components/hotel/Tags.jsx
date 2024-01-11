import { useEffect, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";

export default function Tags({tag}) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(tag)
  }, [tag] )
  return (
    <ul className="tags">
      {tags.map((d, i) => (
        <li key={i}>
          {d}
        </li>
      ))}
    </ul>
  );
}
