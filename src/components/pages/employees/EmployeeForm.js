import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const EmployeeForm = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [ci, setCi] = useState(0);
  const branchId = props.match.params.branchId;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "ci":
        setCi(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || phone === "" || ci < 1) {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        name: name,
        branch: branchId,
        number_field: phone,
        ci: ci,
        active: true,
      };

      if (props.edit) {
        const employeeId = props.match.params.employeeId; // Se identifica el id de la pelicula a editar
        axios.put(`http://127.0.0.1:8000/api/employees/${employeeId}/`, data);
      } else {
        axios.post("http://127.0.0.1:8000/api/employees/", data);
      }

      console.log(data);
      // window.location.replace(`http://localhost:3000/admin/branch/${branchId}/employee`)
    }
  };

  const getEmployee = async () => {
    const employeeId = props.match.params.employeeId; // Se identifica el id de la pelicula a editar
    await axios
      .get(`http://127.0.0.1:8000/api/employees/${employeeId}/`)
      .then((res) => {
        setName(res.data.name);
        setCi(res.data.ci);
        setPhone(res.data.number_field);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.edit) {
      getEmployee();
    }
  }, []);

  return (
    <div>
      <div className="title-style">
        {props.edit ? <h1>Editar empleado</h1> : <h1>Agregar empleado</h1>}
      </div>
      <form method="post">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            className="form-field"
            value={name}
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="ci">Cédula</label>
          <input
            type="ci"
            className="form-field"
            value={ci}
            name="ci"
            id="ci"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="phone"
            className="form-field"
            value={phone}
            name="phone"
            id="phone"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="btn-group">
          <Link to={`/admin/branch/${branchId}`}>
            <button type="button" className="btn-form">
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="btn-form btn-submit"
            onClick={handleSubmit}
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
