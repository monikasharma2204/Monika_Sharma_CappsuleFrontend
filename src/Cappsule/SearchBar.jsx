import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearchText, searchText, fetchDetails }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchDetails(event);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cappsule web development test</h1>

      <div className="input-group mb-3 shadow rounded-pill">
        <span className="input-group-text bg-white border-0 rounded-pill">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="form-control border-0 rounded-pill"
          placeholder="Type your medicine name here"
          aria-label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-primary rounded-pill ms-2"
          type="button"
          onClick={fetchDetails}
        >
          Search
        </button>
      </div>

      <hr className="my-4" />
    </div>
  );
};

export default SearchBar;
