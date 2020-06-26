import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const MovieForm = (props) => {
  // Fecha actual para definir minimo de fecha de estreno
  const curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10); // Se obtiene la fecha en formato string

  // Variables para el formulario
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("1");
  const [duration, setDuration] = useState(0);
  const [language, setLanguage] = useState("1");
  const [subtitles, setSubtitles] = useState(false);
  const [date, setDate] = useState(today);
  const [mode, setMode] = useState("estreno");
  const [synopsys, setSynopsys] = useState("");
  const [year, setYear] = useState(0);

  // Lenguajes y generos
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    // eslint-disable-next-line default-case
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "year":
        setYear(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "subtitles":
        setSubtitles(e.currentTarget.checked);
        break;
      case "date":
        setDate(value);
        break;
      case "mode":
        setMode(value);
        break;
      case "synopsys":
        setSynopsys(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title.trim() === "" ||
      duration < 1 ||
      synopsys.trim() === "" ||
      year < 2000
    ) {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        title: title.toLowerCase(),
        date,
        year,
        genre,
        duration,
        language_field: language,
        subtitle: subtitles,
        state_now: mode,
        synopsys,
      };

      console.log(data);

      if (props.edit) {
        const movieId = props.match.params.movieId; // Se identifica el id de la pelicula a editar
        axios.put(`http://127.0.0.1:8000/api/movies/${movieId}/`, data, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        axios.post("http://127.0.0.1:8000/api/movies/", data);
      }

      // Se decidio no usar ya que hay que hacer refresh a la pagina igual
      window.location.replace("http://localhost:3000/admin/movies");
    }
  };

  const getMovie = async () => {
    const movieId = props.match.params.movieId; // Se identifica el id de la pelicula a editar
    await axios
      .get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
      .then((res) => {
        setTitle(res.data.title);
        setGenre(res.data.genre.genre_id);
        setYear(res.data.year);
        setDuration(res.data.duration);
        setLanguage(res.data.language_field.lang_id);
        setSubtitles(res.data.subtitle);
        setDate(res.data.date);
        setMode(res.data.state_now);
        setSynopsys(res.data.synopsys);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Se buscan los lenguajes y los generos
    axios
      .get(`http://127.0.0.1:8000/api/language/`)
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://127.0.0.1:8000/api/genre/`)
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));

    if (props.edit) {
      getMovie();
    }
  }, []);

  return (
    <div>
      <div className="title-style">
        {props.edit ? <h1>Editar película</h1> : <h1>Agregar película</h1>}
      </div>
      {/* Formulario con todos los campos requeridos */}
      <form method="post">
        <div className="form-group">
          <label htmlFor="title">Nombre de la película</label>
          <input
            type="text"
            className="form-field"
            value={title}
            name="title"
            id="title"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Género</label>
          <select
            value={genre}
            name="genre"
            id="genre"
            className="form-field text-capitalize"
            onChange={(e) => handleChange(e)}
          >
            {genres.map((genre) => (
              <option value={genre.genre_id} key={genre.genre_id}>
                {genre.genre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duración</label>
          <input
            type="number"
            className="form-field"
            value={duration}
            name="duration"
            id="duration"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="year">Año</label>
          <input
            type="number"
            className="form-field"
            value={year}
            name="year"
            id="year"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="synopsys">Descripción</label>
          <textarea
            className="form-field"
            value={synopsys}
            name="synopsys"
            id="synopsys"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="language">Lenguaje</label>
          <select
            value={language}
            name="language"
            id="language"
            className="form-field text-capitalize"
            onChange={(e) => handleChange(e)}
          >
            {languages.map((language) => (
              <option value={language.lang_id} key={language.lang_id}>
                {language.lang}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subtitles">Subtítulos</label>
          <input
            type="checkbox"
            value={subtitles}
            checked={subtitles}
            name="subtitles"
            id="subtitles"
            onChange={(e) => handleChange(e)}
          ></input>
          <span className="ml-2">Español</span>
        </div>
        {/* Se coloca un minimo a la fecha de estreno */}
        <div className="form-group">
          <label htmlFor="date">Fecha de estreno</label>
          <input
            type="date"
            className="form-field"
            min={today}
            value={date}
            name="date"
            id="date"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {/* Estado de la pelicula que se limita a las 3 disponibles */}
        <div className="form-group">
          <label htmlFor="mode">Estado</label>
          <select
            value={mode}
            name="mode"
            id="mode"
            className="form-field"
            onChange={(e) => handleChange(e)}
          >
            <option value="estreno">Estreno</option>
            <option value="cartelera">Cartelera</option>
            <option value="pasada">Pasada</option>
          </select>
        </div>
        {/* Botones de accion */}
        <div className="btn-group my-3">
          <Link to="/admin/movies">
            <button type="button" className="btn-form">
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="btn-form btn-submit"
            onClick={handleSubmit}
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
