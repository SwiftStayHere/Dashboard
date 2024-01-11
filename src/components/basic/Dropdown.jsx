import { Link } from "react-router-dom";

export default function Dropdown({ data, handler }) {
  return (
    <ul className="dropdown">
      {data.map((d, i) => (
        <li key={i}>
          <Link onClick={() => handler() || null} to={d?.url}>
            {d?.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
