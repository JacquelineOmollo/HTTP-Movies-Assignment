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

  const { match, items } = props;
  useEffect(() => {
    setMovie(initialMovie);
    const movieId = match.params.id;
    const movieToUpdate = items.find(movie => {
      console.log(`${movie.id}`, movieId);
      return `${movie.id}` === movieId;
    });

    console.log("movieToUpdate: ", movieToUpdate);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
    // movie();
  }, [match, items]);

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

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        props.history.push(`/item-list/${movie.id}`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

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
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        /> */}
        <div className="baseline" />

        <input
          type="text"
          name=" director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />
        {movie.stars.map((Name, index) => {
          return (
            <input
              type="text"
              placeholder="star"
              value={Name}
              key={index}
              onChange={starHandle(index)}
            />
          );
        })}
        <div className="baseline" />

        <button type="submit">Update</button>
        <button onClick={addName}>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
