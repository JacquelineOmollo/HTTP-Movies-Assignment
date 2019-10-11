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
  console.log("me: UpdateMovie.js: UpdateMovie(): props: ", props);

  const { match, data } = props;
  useEffect(() => {
    const movieId = match.params.id;
    const movieToUpdate = movie.find(item => {
      console.log(`${item.id}`, movieId);
      return `${item.id}` === movieId;
    });

    console.log("movieToUpdate: ", movieToUpdate);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [match, data]);

  const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "title") {
      value = parseInt(value, "");
    }

    setMovie({
      ...movie,
      [event.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateItems(res.data);
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
          onChange={changeHandler}
          placeholder="id"
          value={movie.id}
        />
        <div className="baseline" />

        <input
          type="text"
          name="title"
          onChange={changeHandler}
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
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
