import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../Banner";
import EmployeeTable from "../employees/EmployeeTable";
import ParkingLotList from "../parking lot/ParkingLotList";

const BranchDetail = (props) => {
  const [branch, setBranch] = useState("");
  const branchId = props.match.params.branchId;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/branches/${branchId}/`).then((res) => {
      setBranch(res.data);
    });
  });

  return (
    <div>
      <Banner name="Detalle de la sucursal" />

      <div className="container-fluid px-3 py-1 text-center">
        <div className="row p-4">
          {/* Se muestra la informacion de la sucursal */}
          <div className="title-style m-auto">
            <h2 className="font-weight-bold mb-4 mx-1">
              {branch.zone.name} - {branch.place}
            </h2>
            <h5 style={{ color: "white" }}>
              {branch.state_field}, {branch.city}
            </h5>
            <h5 style={{ color: "white" }}>{branch.number_field}</h5>
          </div>
        </div>

        {/* Tabla de los estacionamientos */}
        <div className="title-style m-auto p-0">
          <h4 className="font-weight-bold">Estacionamientos</h4>
        </div>
        <div className="row mx-2 px-sm-3 pb-3 pt-2">
          <ParkingLotList branchId={branchId} />
        </div>

        {/* Tabla de los empleados */}
        <div className="title-style m-auto pt-0 pb-4">
          <h4 className="font-weight-bold">Empleados</h4>
        </div>
        <div className="row mx-2 px-sm-3 pb-3 pt-2">
          <EmployeeTable branchId={branchId} />
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;
