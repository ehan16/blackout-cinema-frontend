import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Banner from "../../Banner";

const BestClient = () => {

  // Variables de la clase
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/total-client/");
      setOrders(res.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Banner name="Mejores clientes" />

      {/* Tabla de todas las ordenes */}
      <div className="row mx-2 px-sm-3 pb-3 pt-2">
        <div className="col mx-md-3 my-5 text-center">

          {/* Tabla */}
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">Cliente ID</th>
                <th scope="col">Monto total consumido</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((order, index) => (
                    <tr key={index}>
                      <th scope="row">{order.client_id_id}</th>
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

export default BestClient;
