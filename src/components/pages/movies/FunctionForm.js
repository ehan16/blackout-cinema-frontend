import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const FunctionForm = (props) => {
  // Se obtiene la fecha de hoy como limite inferior
  const curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10); // Se obtiene la fecha actual en string para validaciones

  // Variables de la clase
  const [date, setDate] = useState(today);
  const [parkingLots, setParkingLots] = useState([]);
  const [parkingLot, setParkingLot] = useState("");
  const movieId = props.match.params.movieId;
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "parkingLot":
        setParkingLot(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parkingLot === "") {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      // Se consigue cual es el estacionamiento
      const parking = parkingLots[parkingLot];

      const data = {
        lot: parking.capacity,
        movie_id: movieId,
        date: date,
        parking_lot: parking.parking_id,
      };

      if (props.edit) {
        const functionId = props.match.params.functionId; // Se identifica el id de la pelicula a editar
        axios.put(`http://127.0.0.1:8000/api/functions/${functionId}/`, data);
      } else {
        axios.post("http://127.0.0.1:8000/api/functions/", data);
      }

      console.log(data);
      console.log(parking);
      // history.push("/admin/movies");
    }
  };

  const getFunction = async () => {
    const functionId = props.match.params.functionId; // Se identifica el id de la pelicula a editar
    await axios
      .get(`http://127.0.0.1:8000/api/functions/${functionId}/`)
      .then((res) => {
        // setLot(res.data.lot);
        setDate(res.data.date);
        // setBranch(res.data.branch);
        setParkingLot(res.data.parking_lot);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/parkinglots/").then((res) => {
      setParkingLots(res.data);
    });

    if (props.edit) {
      getFunction();
    }
  }, []);

  return (
    <div>
      <div className="title-style">
        {props.edit ? <h1>Editar función</h1> : <h1>Agregar función</h1>}
      </div>
      <form method="post">
        <div className="form-group">
          <label htmlFor="parkingLot">Estacionamiento</label>
          <select
            value={parkingLot}
            name="parkingLot"
            id="parkingLot"
            className="form-field"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Ninguno</option>
            {parkingLots.map((parking, index) => (
              <option
                key={parking.parking_id}
                value={index}
                className="text-capitalize"
              >
                {parking.parking_id} - {parking.branch.city},{" "}
                {parking.branch.place} ({parking.capacity})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha</label>
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
        <div className="btn-group">
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

export default FunctionForm;
