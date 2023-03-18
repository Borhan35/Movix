import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import NotFound from "./pages/404/PageNotFound";
import Home from "./pages/home/Home";
import Similar from "./pages/details/carousel/Similar";
import Recommendation from "./pages/details/carousel/Recommendation";

import { useDispatch } from "react-redux";
import { fetchApiConfig, fetchGeners } from "./store/homeActions";

function App() {
  const dispatch = useDispatch();
  const { mediaType, id } = useParams();

  useEffect(() => {
    dispatch(fetchApiConfig());
    dispatch(fetchGeners());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Details />}>
          <Route path="/:mediaType/:id" element={<Similar />} />
          <Route path="/:mediaType/:id" element={<Recommendation />} />
        </Route>
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
