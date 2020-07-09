import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductRow(props) {

  // Variables de la clase
  let item;
  props.item.product !== undefined
    ? (item = props.item.product)
    : (item = props.item);
  const index = props.index;

  const [comboProduct, setComboProduct] = useState();

  // En caso de que sean combos, se tiene que mostrar sus componentes
  let items;
  if (props.combo) {
    items = (
      <div style={{ fontSize: "0.8rem" }}>
        <p className="my-1">{item.product_1.name}</p>
        <p className="my-1">{item.product_2.name}</p>
        <p className="my-1">{item.product_3.name}</p>
        <p className="my-1">{item.product_4.name}</p>
        <p className="my-1">{item.product_5.name}</p>
      </div>
    );
  }

  useEffect( async() => {
  //  const res = await axios.get("http://127.0.0.1:8000/api/product-combo/?combo=2");
  //  setComboProduct(res.data);
  }, []);

  return (

    <tr>

      {/* Informacion del producto/combo */}
      {props.admin ? (<th scope="row">{!props.combo ? item.product_id : item.combo_id}</th>) : null}
      <td scope="row" className="text-capitalize">{item.name}</td>
      {props.combo ? <th className="text-capitalize">{items}</th> : null}
      <td className="text-capitalize">{item.category !== undefined ? item.category : "Combo"}</td>
      <td>{item.price}</td>

      {/* Dependiendo si es producto o combo, se muestra su status o su cantidad */}
      {!props.buy 
        ? <th>
            {!props.combo ? (item.availability) : item.enable 
              ? (<i className="fa fa-check"></i>) 
              : (<i className="fa fa-times"></i>)
            }
          </th>
        : <th>{props.item.qty}</th>
      }

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
                onClick={() => props.addProduct(item)}
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
            {props.combo ? (
              <Link to={`/admin/combos/${item.combo_id}`}>
                <button className="btn" style={btnStyle}>
                  <i className="fa fa-pencil"></i>
                </button>
              </Link>
            ) : (
              <Link to={`/admin/products/${item.product_id}`}>
                <button className="btn" style={btnStyle}>
                  <i className="fa fa-pencil"></i>
                </button>
              </Link>
            )}
            <button className="btn" style={btnStyle} onClick={() => props.disableProduct(item, !props.combo)}>
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
