import { LuEdit } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function EditBtn({ hotelId }) {
  return (
    <div className="edit-btn">
      <Link to={"/hotel/edit/" + hotelId}>
        <LuEdit /> Modifica
      </Link>
    </div>
  );
}
