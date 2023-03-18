import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const HeaderInput = ({ inputShow, setInputShow, top }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  return (
    <Fragment>
      {inputShow && (
        <div className="searchBar" style={{ top: top }}>
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setInputShow(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </Fragment>
  );
};

export default HeaderInput;
