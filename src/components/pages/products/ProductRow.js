import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductRow(props) {
  // Variables de la clase
  let item;
  // Para poder identificar si es la lista de compra o los productos ya
  props.item.product !== undefined
    ? (item = props.item.product)
    : (item = props.item);
  const index = props.index;

  const [comboP, setComboP] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    if (item.combo_id !== undefined) {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/combo-product/?combo=${item.combo_id}`
      );
      setComboP(res.data);
    }
  };

  return (
    <tr>
      {/* Informacion del producto/combo */}
      {props.admin ? (
        <th scope="row">{!props.combo ? item.product_id : item.combo_id}</th>
      ) : null}
      <td scope="row" className="text-capitalize">
        {item.name}
      </td>
      {props.combo ? (
        <th className="text-capitalize">
          {comboP.map((item) => (
            <p style={{ fontSize: "0.8rem", marginBottom: "5px" }}>
              {item.product_id.name}
            </p>
          ))}
        </th>
      ) : null}
      <td className="text-capitalize">
        {item.category !== undefined ? item.category : "Combo"}
      </td>
      <td>{item.price}$</td>

      {/* Dependiendo si es producto o combo, se muestra su status o su cantidad */}
      {!props.buy ? (
        <th>
          {!props.combo ? (
            item.availability
          ) : item.enable ? (
            <i className="fa fa-check"></i>
          ) : (
            <i className="fa fa-times"></i>
          )}
        </th>
      ) : (
        <th>{props.item.qty}</th>
      )}

      {/* Botones de accion */}
      <td>
        {/* Cuando es cliente */}
        {!props.admin ? (
          <div className="btn-group btn-group-sm">
            {props.buy ? (
              <button className="btn" style={btnStyle}>
                <i
                  className="fa fa-trash"
                  onClick={() => props.deleteProduct(index)}
                ></i>
              </button>
            ) : (
              <button
                className="btn"
                style={btnStyle}
                onClick={() => props.addProduct(item, index)}
                disabled={item.availability === 0 || !item.enable}
              >
                <i className="fa fa-plus"></i>
              </button>
            )}
          </div>
        ) : null}

        {/* Cuando es administrador */}
        {props.admin ? (
          <div className="btn-group btn-group-sm">
            {props.combo ? null : (
              <Link to={`/admin/products/${item.product_id}`}>
                <button className="btn" style={btnStyle}>
                  <i className="fa fa-pencil"></i>
                </button>
              </Link>
            )}
            <button
              className="btn"
              style={btnStyle}
              onClick={() => props.disableProduct(item, !props.combo)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
}

const btnStyle = {
  background: "#292929",
  color: "red",
  width: "40px",
};
