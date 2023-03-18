import { homeActions } from "./homeSlice";
import { fetchDataFromApi } from "../utils/api";

export const fetchApiConfig = () => {
  return (dispatch) => {
    fetchDataFromApi("/configuration").then((res) => {
      const { images } = res;
      const { secure_base_url } = images;
      const url = {
        backdrop: secure_base_url + "original",
        poster: secure_base_url + "original",
        profile: secure_base_url + "original",
      };
      dispatch(homeActions.getApiConfig(url));
    });
  };
};

export const fetchGeners = () => {
  return async (dispatch) => {
    const promises = [];
    const endPoints = ["tv", "movie"];
    const allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(homeActions.getGenres(allGenres));
  };
};
