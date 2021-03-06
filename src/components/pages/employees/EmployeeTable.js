import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EmployeeTable = (props) => {
  const [employees, setEmployees] = useState();

  const getEmployees = () => {
    axios
      .get(`http://127.0.0.1:8000/api/employees/?branch=${props.branchId}`)
      .then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Metodo para despedir al empleado
  const fireEmployee = (employee) => {
    const data = {
      name: employee.name,
      branch: employee.branchId,
      number_field: employee.number_field,
      ci: employee.ci,
      active: false,
    };

    swal({
      title: "Confimación",
      text: "Una vez que lo despida, no podrá recuperarlo. ¿Seguro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            `http://127.0.0.1:8000/api/employees/${employee.employee_id}/`,
            data
          )
          .then((res) => {
            this.getEmployees(); // Se actualiza la informacion mostrada
            swal("Exitoso", "¡Se ha despedido al empleado!", "info", {
              dangerMode: true,
            });
          });
      } else {
        swal("No ha ocurrido nada", { dangerMode: true });
      }
    });
  };

  return (
    <div className="col">
      <Link to={`/admin/branch/${props.branchId}/add-employee`}>
        <button className="btn-add">Agregar empleado</button>
      </Link>

      <div className="mx-md-3 my-5 text-center">
        {/* Solo se muestra la tabla si hay empleados */}
        {employees ? (
          <table className="table table-responsive-sm table-hover table-dark list">
            <thead>
              <tr className="bg-danger">
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cédula</th>
                <th scope="col">Teléfono</th>
                {/* <th scope="col">Sucursal</th> */}
                <th scope="col">Estado</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <th scope="row">{employee.employee_id}</th>
                  <td className="text-capitalize">{employee.name}</td>
                  <td className="text-capitalize">{employee.ci}</td>
                  <td>{employee.number_field}</td>
                  {/* <td className="text-capitalize">{ employee.branch.place }</td> */}
                  <td className="text-capitalize">
                    {employee.active ? "Activo" : "Resignado"}
                  </td>
                  <td className="btn-group btn-group-sm">
                    {/* Botones de accion con el empleado */}
                    <Link
                      to={`/admin/branch/:branchId/employee/${employee.employee_id}`}
                    >
                      <button className="btn" style={btnStyle}>
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Link>
                    <button
                      className="btn"
                      style={btnStyle}
                      onClick={() => fireEmployee(employee)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#292929",
  color: "red",
  width: "40px",
};

export default EmployeeTable;
