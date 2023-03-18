import React, { useEffect, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../imgLazyLoading/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "./CircleRating/CircleRating";
import Genres from "../../components/genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endPoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const slideContainer = useRef();

  const navigateHandler = (dir) => {
    const container = slideContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <span className="title skeleton"></span>
          <span className="date skeleton"></span>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="arrow carouselLeftNav"
          onClick={() => navigateHandler("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow carouselRighttNav"
          onClick={() => navigateHandler("right")}
        />
        {title && <div className="carouselTitle">{title}</div>}
        {!loading ? (
          <div className="carouselItems" ref={slideContainer}>
            {data?.map((item) => {
              const {
                id,
                poster_path,
                name,
                title,
                release_date,
                first_air_date,
                vote_average,
                genre_ids,
                media_type,
              } = item;
              const posterUrl = poster_path
                ? url.poster + poster_path
                : PosterFallback;
              return (
                <div
                  key={id}
                  className="carouselItem"
                  onClick={() => {
                    navigate(`${media_type || endPoint}/${id}`);
                  }}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={vote_average.toFixed(1)} />
                    <Genres data={genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{name || title}</span>
                    <span className="date">
                      {dayjs(release_date || first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
