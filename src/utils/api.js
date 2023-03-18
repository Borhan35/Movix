import axios from "axios";

// Call Base Url
const BASE_URL = "https://api.themoviedb.org/3";

// Call tmdb token from .env file
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmIxYjdjYzY1NTU2ODk3MTM3MzBmMGJiODU3NGIyZSIsInN1YiI6IjYzZTk2MzQ2YTJlNjAyMDA4MWZiNzhiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ax_XfwzoKPnv1qrpXEeQIQkO6UiJkrOIHJdAYneoRZo";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
