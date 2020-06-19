import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const BranchForm = (props) => {
  // Variables de la clase
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "zone":
        setZone(value);
        break;
      case "place":
        setPlace(value);
        break;
      case "phone":
        setPhone(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state === "" ||
      city === "" ||
      zone === "" ||
      place === "" ||
      phone < 1
    ) {
      // Se valida que ningun campo este vacio o con valor erroneo
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        state_field: state,
        city: city,
        zone: zone,
        place: place,
        number_field: phone,
        enable: true,
      };

      if (props.edit) {
        const branchId = props.match.params.branchId; // Se identifica el id de la pelicula a editar
        axios.put(`http://127.0.0.1:8000/api/branches/${branchId}/`, data);
      } else {
        axios.post(`http://127.0.0.1:8000/api/branches/`, data);
      }

      window.location.replace("http://localhost:3000/admin/branches"); // Se devuelve a la lista de sucursales
    }
  };

  useEffect(() => {
    if (props.edit) {
      getBranch();
    }
  }, []);

  const getBranch = async () => {
    const branchId = props.match.params.branchId; // Se identifica el id de la pelicula a editar
    await axios
      .get(`http://127.0.0.1:8000/api/branches/${branchId}/`)
      .then((res) => {
        setState(res.data.state_field);
        setCity(res.data.city);
        setZone(res.data.zone);
        setPlace(res.data.place);
        setPhone(res.data.number_field);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="title-style">
        {props.edit ? <h1>Editar sucursal</h1> : <h1>Agregar sucursal</h1>}
      </div>
      <form method="post">
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            className="form-field"
            value={state}
            name="state"
            id="state"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            className="form-field"
            value={city}
            name="city"
            id="city"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="zone">Zona</label>
          <input
            type="text"
            className="form-field"
            value={zone}
            name="zone"
            id="zone"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="place">Lugar</label>
          <input
            type="text"
            className="form-field"
            value={place}
            name="place"
            id="place"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="number"
            className="form-field"
            value={phone}
            name="phone"
            id="phone"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="btn-group">
          <Link to="/admin/branches">
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

export default BranchForm;
