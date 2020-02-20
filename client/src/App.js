import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/UpdateMovie";
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [theMovies, setTheMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const movieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => setTheMovies(response.data))
      .catch(error => console.log(error.response));
  };

  const updateMovie = updatedMovie => {
    setTheMovies(
      theMovies.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const deletedMovie = id => {
    setTheMovies(theMovies.filter(movie => movie.id !== id));
  };

  useEffect(() => {
    console.log("it's working");
    movieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={props => <MovieList {...props} />} />

      <Route
        path="/movies/:id"
        render={props => (
          // const movie = theMovies.find(
          //   movie => movie.id === props.match.params.id
          // );
          // return (
          <Movie
            {...props}
            addToSavedList={addToSavedList}
            // movie={movie}
            deletedMovie={deletedMovie}
          />
          // );
        )}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          // const movie = theMovies.find(
          //   movie => movie.id === props.match.params.id
          // );
          // if (!movie) {
          //   return <div>Loading...</div>;
          // }
          // return (
          <UpdateMovie
            {...props}
            // movie={movie}
            savedList={savedList}
            updateMovie={updateMovie}
            movieList={movieList}
          />
          // );
        )}
      />
    </>

    //  <div>
    //      <SavedList list={savedList} />
    //     <Link to="/add">Add New Movie</Link>
    //     <Route exact path="/" component={MovieList} />
    //     <Route path="/add" component={addToSavedList} />
    //     <Route
    //       path="/movies/:id"
    //       render={props => {
    //         return <Movie {...props} addToSavedList={this.addToSavedList} />;
    //       }} */}
    /* //     />
  //   </div> */
  );
};

export default App;
