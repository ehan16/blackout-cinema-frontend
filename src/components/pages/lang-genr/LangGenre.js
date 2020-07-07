import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Banner from "../../Banner";

const LangGenre = () => {
  // Variables de la clase
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");

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

  const handleSubmitGenre = async(e) => {
    e.preventDefalut();
    if (genre.trim() === "") {
      swal("ERROR", "Existen campos invalidos", "error", { dangerMode: true });
    } else {

      // Se confirma que desea insertar
      swal({
        title: "Confimación",
        text: `Una vez que inserte ${genre}, no podrá cambiarlo. ¿Seguro?`,
        buttons: true,
        dangerMode: true,
      }).then((willInsert) => {
        if (willInsert) {
          axios.post("http://127.0.0.1:8000/api/genre/", { genre }).then(res => {
              getGenres();
            }
          );
        } else {
          swal("No ha ocurrido nada", { dangerMode: true });
        }
      });

    }
  };

  const hanldeSubmitLang = async(e) => {
    e.preventDefault();
    if (language.trim() === "") {
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {

      // Se confirma que desea insertarlo
      swal({
        title: "Confimación",
        text: `Una vez que inserte ${language}, no podrá cambiarlo. ¿Seguro?`,
        buttons: true,
        dangerMode: true,
      }).then((willInsert) => {
        if (willInsert) {
          axios.post("http://127.0.0.1:8000/api/language/", { language }).then(res => getLanguages());
        } else {
          swal("No ha ocurrido nada", { dangerMode: true });
        }
      });

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

  return (
    <div>
      <Banner name="Lenguajes y Generos" />
      {/* Vista que para ver los generos y lenguaje, asi como agregarlos */}
      <div className="row mx-2 px-sm-3 pb-3 pt-2 ">
        {/* Con respecto a los generos */}
        <div className="col-lg-4 my-3 py-4 text-center rounded">
          {/* Formulario para agregar generos */}
          <h4 className="mt-2" style={{ color: "red", fontWeight: "bold" }}>
            Agregar Genero:
          </h4>
          <form method="post" className="p-0 pb-4">
            <input
              className="form-field mb-2 w-50"
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
            Agregar Lenguaje:
          </h4>
          <form method="post" className="p-0 pb-4">
            <input
              value={language}
              name="language"
              id="language"
              className="form-field w-50"
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
        <div className="col-lg-4 my-3 py-4 px-5 text-center">
          {genres ? (
            <table className="table table-striped table-hover table-dark">
              <thead>
                <tr className="bg-danger">
                  <th scope="col">ID</th>
                  <th scope="col">Género</th>
                </tr>
              </thead>
              <tbody>
                {
                  genres.map(gen => (
                    <tr key={gen.genre_id}>
                      <th scope="row">{gen.genre_id}</th>
                      <th scope="row">{gen.genre}</th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : null}
        </div>

        {/* Con respecto a los lenguages */}
        <div className="col-lg-4 my-3 py-4 px-5 text-center">
          {languages ? (
            <table className="table table-striped table-hover table-dark">
              <thead>
                <tr className="bg-danger">
                  <th scope="col">ID</th>
                  <th scope="col">Lenguaje</th>
                </tr>
              </thead>
              <tbody>
                {
                  languages.map(lang => (
                    <tr key={lang.lang}>
                      <th scope="row">{lang.lang_id}</th>
                      <th scope="row">{lang.lang}</th>
                    </tr>
                  ))
                }
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
