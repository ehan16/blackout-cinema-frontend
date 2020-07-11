import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Banner from "../../Banner";

const VehicleList = () => {
  // Variables de la clase
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(35);
  const [vehicles, setVehicles] = useState([]);

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

      swal({
        title: "Confimación",
        text: `Una vez que lo inserte, no podrá cambiarlo. ¿Seguro?`,
        buttons: true,
        dangerMode: true,
      }).then((willInsert) => {
        if (willInsert) {
          axios
            .post("http://127.0.0.1:8000/api/vehicles/", data)
            .then((res) => getVehicles());
        } else {
          swal("No ha ocurrido nada", { dangerMode: true });
        }
      });

    }
  };

  const getVehicles = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/vehicles/`);
    setVehicles(res.data);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div>
      <Banner name="Vehiculos" />
      <div className="container-fluid p-3 text-center">
        {/* Se integra un formulario sencillo para agregar estacionamientos */}
        <form method="post" className="pb-0">
          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input
              type="text"
              className="form-field w-75"
              value={model}
              name="model"
              id="model"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input
              type="number"
              className="form-field w-75"
              value={price}
              name="price"
              id="price"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <button type="submit" className="btn-add mt-4" onClick={handleSubmit}>
            Agregar modelo
          </button>
        </form>

        <div className="mx-md-3 p-4 my-5 text-center">
          {/* Tabla de los estacionamientos */}
          {vehicles ? (
            <table className="table table-responsive-sm table-hover table-dark list">
              <thead>
                <tr className="bg-danger">
                  <th scope="col">ID</th>
                  <th scope="col">Modelo de vehiculo</th>
                  <th scope="col">Precio de entrada por el vehiculo</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}>
                    <th scope="row">{vehicle.vehicle_id}</th>
                    <th className="text-capitalize">{vehicle.model}</th>
                    <th>{vehicle.price}$</th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
