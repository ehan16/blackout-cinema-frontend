import React from "react";
import { Link } from "react-router-dom";

function MovieItem(props) {
  return (
    <div className="card movie">
      <div>
        <h4 className="text-capitalize">
          {props.movie.title}{" "}
          <span style={{ color: "darkGray" }}>
            ({props.movie.language_field.lang})
          </span>
        </h4>
        <ul
          className="mb-0"
          style={{ listStyleType: "none", paddingBottom: "10px" }}
        >
          {/* Los datos de la pelicula */}
          {props.mode === "" ? <li>ID: {props.movie.movie_id}</li> : null}
          <li>Año: {props.movie.year}</li>
          <li className="text-capitalize">Género: {props.movie.genre.genre}</li>
          <li>Duración: {props.movie.duration} min</li>
          <li>Subtítulos: {props.movie.subtitle ? "Español" : "No"}</li>
          {props.mode === "to-release" ? (
            <li>Fecha de estreno: {props.movie.date}</li>
          ) : null}
        </ul>
        <div>
          {/* Botones de accion */}
          {props.mode === "on-air" ? (
            <Link to={`/movie/${props.movie.movie_id}`}>
              <button style={buttonStyle}>Detalles</button>
            </Link>
          ) : null}

          {props.mode === "" ? (
            <div>
              <Link to={`/admin/movies/${props.movie.movie_id}`}>
                <button style={editStyle}>Editar</button>
              </Link>
              {props.movie.state_now === "estreno" ? (
                <button
                  style={buttonStyle}
                  onClick={() => props.launchMovie(props.movie)}
                >
                  Estrenar
                </button>
              ) : null}
              {props.movie.state_now === "cartelera" ? (
                <button
                  style={buttonStyle}
                  onClick={() => props.takeOutMovie(props.movie)}
                >
                  Culminar
                </button>
              ) : null}
              {props.movie.state_now === "cartelera" ? (
                <Link to={`/admin/movie/${props.movie.movie_id}/functions`}>
                  <button style={buttonStyle}>Funciones</button>
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#d40000",
  margin: "5px",
  color: "white",
  border: "red",
};

const editStyle = {
  background: "#6e0d0d",
  margin: "5px",
  color: "white",
  border: "1px solid #6e0d0d",
};

export default MovieItem;
