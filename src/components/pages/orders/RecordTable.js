import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../Banner";

const RecordTable = (props) => {
  const [record, setRecords] = useState([]);

  const getRecords = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/record/")
      .then((res) => {
        setRecords(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      <Banner name="Histórico de productos" />
      <div className="row mx-2 px-sm-3 pb-3 pt-2">
        <div className="col mx-md-3 my-5 text-center">
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">ID Orden</th>
                <th scope="col">Fecha</th>
                <th scope="col">Producto / Combo</th>
                {/* <th scope="col">Sucursal</th> */}
                {/* <th scope="col">Función</th> */}
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {/* Se itera cada item del historico */}
              {record
                ? record.map((item) => (
                    <tr key={item.record_id}>
                      <th scope="row">{item.order_id.order_id}</th>
                      <td className="text-capitalize">{item.order_id.date}</td>
                      {/* Si es un producto lo que se compro */}
                      {item.product_id ? (
                        <td className="text-capitalize">
                          {item.product_id.name}
                        </td>
                      ) : null}
                      {/* Si es un combo lo que se compro */}
                      {item.combo_id ? (
                        <td className="text-capitalize">
                          {item.combo_id.name}
                        </td>
                      ) : null}
                      <td className="text-capitalize">{item.qty}</td>
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

export default RecordTable;
