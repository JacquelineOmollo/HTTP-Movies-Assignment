import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: ["", "", ""]
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

  // const { match, items } = props;

  useEffect(() => {
    setMovie(initialMovie);
    // const movieId = match.params.id;
    // const movieToUpdate = items.find(movie => {
    //   console.log(`${movie.id}`, movieId);
    // return `${movie.id}` === movieId;

    // console.log("movieToUpdate: ", movieToUpdate);
    // if (movieToUpdate) {
    //   setMovie(movieToUpdate);
    // }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };
  const starHandle = index => event => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? event.target.value : star;
      })
    });
  };

  const handleChange = event =>
    setMovie({ ...movie, [event.target.name]: event.target.value });

  const addName = event => {
    event.preventDefault();
    setMovie({ ...movie, stars: [...movie.stars, ""] });
  };

  // const deleteName = event => {
  //   event.preventDefault();
  //   setMovie({ ...movie, stars: [...movie.stars, ""] });
  // };
  // if (!movie) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          onChange={handleChange}
          placeholder="id"
          value={movie.id}
        />
        <div className="baseline" />

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        {/* <input
          type="text"
          name=" director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        /> */}
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />
        {movie.stars.map((starName, index) => {
          return (
            <input
              type="text"
              placeholder="star"
              value={starName}
              key={index}
              onChange={starHandle(index)}
            />
          );
        })}
        <div className="baseline" />

        <button onClick={addName}>Add Star</button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
