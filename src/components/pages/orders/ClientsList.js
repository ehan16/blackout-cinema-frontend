import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../Banner";

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  const getClients = () => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClients();
  });

  return (
    <div>
      <Banner name="Clientes" />
      <div className="row mx-3 px-sm-5 pb-3 pt-2">
        <div className="col my-5 text-center">
          <table className="table table-responsive-md table-hover table-dark">
            <thead>
              <tr className="bg-danger">
                <th scope="col">ID</th>
                <th scope="col">Cédula</th>
                <th scope="col">Placa</th>
                <th scope="col">Email</th>
                <th scope="col">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {clients
                ? clients.map((client) => (
                    <tr key={client.client_id}>
                      <th scope="row">{client.client_id}</th>
                      <td>{client.identification}</td>
                      <td>{client.plate}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
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

export default ClientsList;
