import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  return (
    <Fragment>
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search for a movie or tv shows..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
        />
        <button type="submit">search</button>
      </div>
    </Fragment>
  );
};

export default SearchInput;
