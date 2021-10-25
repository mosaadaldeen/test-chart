import React from "react";
import "../App.css";

function Search({ filter, setFilter }) {
  return (
    <div className="search">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
        type="search"
      />
    </div>
  );
}

export default Search;
