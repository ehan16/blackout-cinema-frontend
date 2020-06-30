import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Banner from "../../Banner";

const LangGenre = () => {
  // Variables de la clase
  const [languages, setLanguages] = useState();
  const [genres, setGenres] = useState();
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  let edit = false;
  let editID;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "language":
        setLanguage(value);
        break;
      case "genre":
        setGenre(value);
        break;
    }
  };

  const handleSubmitGenre = (e) => {
    e.preventDefalut();
    if (genre.trim() === "") {
      swal("ERROR", "Existen campos invalidos", "error", { dangerMode: true });
    } else {
      // Data a insertar en la BBDD
      const data = {
        genre,
      };

      axios.post("http://127.0.0.1:8000/api/genre/", data);
    }
  };

  const hanldeSubmitLang = (e) => {
    e.preventDefault();
    if (language.trim() === "") {
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      // Data a insertar en la BBDD
      const data = {
        language,
      };

      axios.post("http://127.0.0.1:8000/api/language/", data);
    }
  };

  const getGenres = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/genre/`);
      setGenres(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getLanguages = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/language/`);
      setLanguages(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGenres();
    getLanguages();
  });

  const editField = (object, isGenre) => {
    // En primer lugar se cambia el valor de edit a verdadero
    edit = true;

    // Se 
    if (isGenre) {
      editID = object.genre_id;
      setGenre(object.genre);
    } else {
      editID = object.lang_id;
      setLanguage(object.lang)
    }

  }

  return (
    <div>
      <Banner name="Lenguajes y Generos" />
      {/* Vista que para ver los generos y lenguaje, asi como agregarlos */}
      <div className="row mx-2 px-sm-3 pb-3 pt-2 ">
        {/* Con respecto a los generos */}
        <div className="col-md-4 my-3 py-4 text-center card-style rounded">
          {/* Formulario para agregar generos */}
          <h4 className="mt-2" style={{ color: "red", fontWeight: "bold" }}>
            Agregar Generos:
          </h4>
          <form method="post" className="pb-0">
            <input
              className="form-field mb-2"
              style={{ width: "auto" }}
              value={genre}
              name="genre"
              id="genre"
              onChange={(e) => handleChange(e)}
            ></input>
            <span>
              <button
                className="ml-2"
                style={{ width: "auto", borderRadius: "30px" }}
                type="submit"
                onClick={handleSubmitGenre}
              >
                <i class="fa fa-plus-circle"></i>
              </button>
            </span>
          </form>

          {/* Formulario para agregar lenguajes */}
          <h4 className="mt-2" style={{ color: "red", fontWeight: "bold" }}>
            Agregar Lenguajes:
          </h4>
          <form method="post" className="pb-0">
            <input
              value={language}
              name="language"
              id="language"
              className="form-field"
              style={{ width: "auto" }}
              onChange={(e) => handleChange(e)}
            ></input>
            <span>
              <button
                type="submit"
                onClick={hanldeSubmitLang}
                className="ml-2"
                style={{ width: "auto", borderRadius: "30px" }}
              >
                <i class="fa fa-plus-circle"></i>
              </button>
            </span>
          </form>
        </div>

        {/* Con respecto a los generos */}
        <div className="col-md-4 my-3 py-4 text-center">
          {genre ? (
            <table className="table table-striped table-hover table-dark">
              <thead>
                <tr className="bg-danger">
                  <th scope="col">ID</th>
                  <th scope="col">Género</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genr) => {
                  <tr key={genr.genre_id}>
                    <th scope="row">{genr.genre_id}</th>
                    <th scope="row">{genr.genre}</th>
                    <th>
                      <button
                        className="btn"
                        style={btnStyle}
                        onClick={() => editField()}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </th>
                  </tr>;
                })}
              </tbody>
            </table>
          ) : null}
        </div>

        {/* Con respecto a los lenguages */}
        <div className="col-md-4 my-3 py-4 text-center">
          {languages ? (
            <table className="table table-striped table-hover table-dark">
              <thead>
                <tr className="bg-danger">
                  <th scope="col">ID</th>
                  <th scope="col">Lenguaje</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => {
                  <tr key={lang.lang_id}>
                    <th scope="row">{lang.lang_id}</th>
                    <th scope="row">{lang.lang}</th>
                    <th>
                      <button
                        className="btn"
                        style={btnStyle}
                        onClick={() => editField()}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </th>
                  </tr>;
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#292929",
  color: "red",
  width: "40px",
};

export default LangGenre;
