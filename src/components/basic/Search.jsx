import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function Search({ search, setSearch, pls,handleSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="search-form"
    >
      <label htmlFor="search">
        <FiSearch />
      </label>
      <input
        value={search}
        onChange={(e) => {
          // setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        type="text"
        id="search"
        placeholder={pls || "Quick Search"}
      />
      <button type="submit">
        <HiOutlineAdjustmentsHorizontal />
      </button>
    </form>
  );
}
