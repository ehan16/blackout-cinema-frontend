import React from "react";
import ProductRow from "./ProductRow";

const ProductTable = (props) => {
  return (
    <table className="table table-responsive-sm table-hover table-dark list">
      <thead>
        <tr className="bg-danger">
          {props.admin ? <th scope="col">ID</th> : null}
          <th scope="col">Nombre</th>
          {!props.buy && props.combo ? <th>Items</th> : null}
          <th scope="col">Categoría</th>
          <th scope="col">Precio</th>
          <th>Cantidad</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((item, index) => (
          <ProductRow
            key={index}
            combo={props.combo}
            admin={props.admin}
            item={item}
            index={index}
            buy={props.buy}
            addProduct={props.addProduct}
            deleteProduct={props.deleteProduct}
            disableProduct={props.disableProduct}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
