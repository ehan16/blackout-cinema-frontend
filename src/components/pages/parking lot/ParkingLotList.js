import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

const ParkingLotList = (props) => {
  // Variables de la clase
  const [parkingLots, setParkingLots] = useState([]);
  const [capacity, setCapacity] = useState(50);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "capacity":
        setCapacity(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (capacity < 20) {
      // Se valida que ningun campo este vacio o erroneo
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        branch: props.branchId,
        capacity: capacity,
      };

      axios
        .post("http://127.0.0.1:8000/api/parkinglots/", data)
        .then((res) => getParkingLots());
      console.log(data);
    }
  };

  const getParkingLots = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/parkinglots/")
      .then((res) => {
        setParkingLots(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getParkingLots();
  }, []);

  return (
    <div>
      <div className="row mx-2 px-sm-3 pb-3 pt-2">
        <div className="text-center">

          {/* Se integra un formulario sencillo para agregar estacionamientos */}
          <form method="post">
            <div className="form-group">
              <label htmlFor="capacity">Capacidad</label>
              <input
                type="capacity"
                className="form-field"
                value={capacity}
                name="capacity"
                id="capacity"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="btn-group">
              <button
                type="submit"
                className="btn-form btn-submit"
                onClick={handleSubmit}
              >
                Agregar estacionamiento
              </button>
            </div>
          </form>
        </div>

        <div className="col mx-md-3 my-5 text-center">
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">ID</th>
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
                      <td className="text-capitalize">{ parkingLot.capacity }</td>
                      <td className="text-capitalize">{parkingLot.capacity}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotList;
