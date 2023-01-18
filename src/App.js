import { useEffect, useState } from "react";
import "./app.css";
import SearchIcon from "./search.svg";
import MovieCard from "./movieCard";

//API KEY: aef5743c
const API_URL = "http://www.omdbapi.com/?apikey=aef5743c";

const App = () => {
  //states
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //fetching movies data from API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Shrek");
  }, []);

  return (
    <div className="app">
      <h1>My movie app</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
