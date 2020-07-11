import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const VehicleList = (props) => {
  // Variables de la clase
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(35);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price < 20 || model.trim() === "") {
      // Se valida que ningun campo este vacio o erroneo
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        model: model.toLowerCase(),
        price,
      };

      axios
        .post("http://127.0.0.1:8000/api/parkinglots/", data)
        .then((res) => getParkingLots());
      console.log(data);
    }
  };

  const getParkingLots = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/parkinglots/?parking=${props.branchId}`
    );
    setParkingLots(res.data);
  };

  useEffect(() => {
    getParkingLots();
  }, []);

  return (
    <div className="col">
      <div>
        {/* Se integra un formulario sencillo para agregar estacionamientos */}
        <form method="post" className="pb-0">
          <div className="form-group">
            <label htmlFor="capacity">Capacidad</label>
            <input
              type="number"
              className="form-field"
              value={capacity}
              name="capacity"
              id="capacity"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="btn-group"></div>
        </form>
        {/* Un buton para que pueda agregar estacionamientos a esa sucursal */}
        <button type="submit" className="btn-add" onClick={handleSubmit}>
          Agregar estacionamiento
        </button>
      </div>

      <div className="mx-md-3 my-5 text-center">
        {/* Tabla de los estacionamientos */}
        {parkingLots ? (
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">Número</th>
                <th scope="col">Sucursal</th>
                <th scope="col">Capacidad</th>
              </tr>
            </thead>
            <tbody>
              {parkingLots
                ? parkingLots.map((parkingLot) => (
                    <tr key={parkingLot.parking_id}>
                      <th scope="row">{parkingLot.parking_id}</th>
                      <td className="text-capitalize">
                        {parkingLot.branch.zone} - {parkingLot.branch.place}
                      </td>
                      <td className="text-capitalize">{parkingLot.capacity}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default VehicleList;
