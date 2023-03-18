import React from "react";

import "./style.scss";

import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";

import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousel/Similar";
import Recommendation from "./carousel/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: creadits, loading: creaditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <React.Fragment>
      <DetailsBanner video={data?.results[0]} crew={creadits?.crew} />
      <Cast data={creadits?.cast} loading={creaditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </React.Fragment>
  );
};

export default Details;
