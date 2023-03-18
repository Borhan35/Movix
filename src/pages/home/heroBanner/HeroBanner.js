import React, { useEffect, useState } from "react";

import Img from "../../../components/imgLazyLoading/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SearchInput from "../../../components/searchInput/SearchInput";

import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/discover/movie");

  useEffect(() => {
    const length = data?.results.length;
    const bg =
      url?.backdrop +
      data?.results[Math.floor(Math.random() * length)].backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="backdrop-opacity"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <h2 className="title">Welcome</h2>
          <p className="subTitle">
            Millions of movies, TV shows and people to discover
          </p>
          <SearchInput />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
