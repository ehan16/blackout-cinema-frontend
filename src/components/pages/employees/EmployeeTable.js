import React, { useState, useEffect } from "react";
import axios from 'axios';

const EmployeeTable = (props) => {

    const [employees, setEmployees] = useState([]);

    const getEmployees = async() => {
        await axios.get('http://127.0.0.1:8000/api/employees/')
        .then(res =>  {
            setEmployees(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div>

            <div className="row mx-2 px-sm-3 pb-3 pt-2">

                    <div className="text-center">
                        <Link to="/admin/add-movie/"><button className="btn-add" >Agregar empleado</button></Link>
                    </div>

                <div className="col mx-md-3 my-5 text-center">
                    <table className="table table-responsive-sm table-hover table-dark list">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cédula</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Activo</th>
                            </tr>
                        </thead>
                        <tbody>
                            { employees 
                                ? employees.map(employee => 
                                    <tr key={ employee.employee_id }>
                                        <th scope="row">{ employee.employee_id }</th>
                                        <td className="text-capitalize">{ employee.name }</td>
                                        <td className="text-capitalize">{ employee.ci }</td>
                                        <td>{ employee.number_field }</td>
                                        <td className="text-capitalize">{ employee.branch.place }</td>
                                        <td className="text-capitalize">{ employee.active ? 'Activo' : 'Resignado' }</td>
                                    </tr>
                                    )
                                : null
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )

}

export default EmployeeTable;
