import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../Banner";

const OrdersList = () => {

  // Variables de la clase
  const curr = new Date();
  // curr.setDate(curr.getDate());
  const today = curr.toISOString().substr(0, 10);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const getOrders = async (search) => {
    if(search) {
      const res = await axios.get(`http://127.0.0.1:8000/api/orders/?start=${startDate}&end=${endDate}`);
      setOrders(res.data);
    } else {
      const res = await axios.get("http://127.0.0.1:8000/api/orders/");
      setOrders(res.data);
    }
  };

  useEffect(() => {
    getOrders(false);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    // eslint-disable-next-line default-case
    switch (name) {
      case "endDate":
        setEndDate(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getOrders(true);
  };

  return (
    <div>
      <Banner name="Órdenes de compra" />

      {/* Tabla de todas las ordenes */}
      <div className="row mx-2 px-sm-3 pb-3 pt-2">
        <div className="col mx-md-3 my-5 text-center">
          {/* Formulario para elegir rango de fechas */}
          <form method="post" className="pb-5">
            <div className="form-group d-flex justify-content-center">
              <label htmlFor="startDate" className="my-0 mx-2">Desde</label>
              <input
                type="date"
                className="form-field w-50 m-2 p-0"
                value={today}
                max={startDate}
                name="startDate"
                id="startDate"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group d-flex justify-content-center">
              <label htmlFor="endDate" className="my-0 mx-2">Hasta</label>
              <input
                type="date"
                className="form-field w-50 m-2 p-0"
                value={endDate}
                max={today}
                name="endDate"
                id="endDate"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              className="btn-form btn-submit"
              type="submit"
              onClick={handleSubmit}
            >
              Buscar
            </button>
          </form>

          {/* Total de ganancias entre peliculas y productos */}

          {/* Tabla */}
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">C.I</th>
                <th scope="col">Película</th>
                <th scope="col">Sucursal</th>
                <th scope="col">Función</th>
                <th scope="col">Monto</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((order) => (
                    <tr key={order.order_id}>
                      <th scope="row">{order.order_id}</th>
                      <td className="text-capitalize">{order.date}</td>
                      <td>{order.client_id.email}</td>
                      <td>{order.client_id.identification}</td>
                      <td className="text-capitalize">
                        {order.function.movie_id.title}
                      </td>
                      <td className="text-capitalize">
                        {order.function.parking_lot.branch.zone} -{" "}
                        {order.function.parking_lot.branch.place}
                      </td>
                      <td className="text-capitalize">
                        {order.function.function_id}
                      </td>
                      <td className="text-capitalize">{order.amount}</td>
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

export default OrdersList;
