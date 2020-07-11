import React from "react";
import { Link } from "react-router-dom";

function BranchItem(props) {
  return (
    <div className="card branch">
      <div>
        <h4 className="text-capitalize">{props.branch.place}</h4>
        <ul
          className="mb-0"
          style={{ listStyleType: "none", paddingBottom: "10px" }}
        >
          {props.admin ? <li>ID: {props.branch.branchs_id}</li> : null}
          <li className="text-capitalize">Edo. {props.branch.state_field}</li>
          <li className="text-capitalize">{props.branch.city}</li>
          <li className="text-capitalize">{props.branch.zone}</li>
          <li>{props.branch.number_field}</li>
          <li>{props.branch.enable ? "Activo" : "Inactivo"}</li>
        </ul>
        <div style={{ display: "flex" }}>
          {props.admin ? (
            <button
              style={secondaryStyle}
              onClick={() => props.deleteBranch(props.branch)}
            >
              {props.branch.enable ? "Inhabilitar" : "Habilitar"}
            </button>
          ) : null}
          {props.admin ? (
            <Link to={`/admin/branches/${props.branch.branchs_id}`}>
              <button style={primaryStyle}>Editar</button>
            </Link>
          ) : null}
          {props.admin ? (
            <Link to={`/admin/branch/${props.branch.branchs_id}`}>
              <button style={primaryStyle}>Detalles</button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const primaryStyle = {
  background: "d40000",
  margin: "5px",
  color: "white",
  border: "red",
};

const secondaryStyle = {
  background: "#6e0d0d",
  margin: "5px",
  color: "white",
  border: "1px solid #6e0d0d",
};

export default BranchItem;
