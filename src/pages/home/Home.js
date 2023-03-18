import React, { Fragment } from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";

const Home = () => {
  return (
    <Fragment>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </Fragment>
  );
};

export default Home;
