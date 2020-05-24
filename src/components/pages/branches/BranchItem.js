import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

function BranchItem(props) {
    return (
        <div className="card branch">
            <div>
            <h4>{ props.branch.place }</h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>
                    { props.admin ? <li>ID: { props.branch.id }</li> : null}
                    <li>Estado: { props.branch.state }</li>
                    <li>Ciudad: { props.branch.city }</li>
                    <li>Zona: { props.branch.zone }</li>
                    <li>Teléfono: { props.branch.phone }</li>
                    { props.admin ? <li>Número de empleados: { props.branch.employees }</li> : null}
                </ul>
                <div style={{ display: 'flex' }}>
                    { props.admin ? <button style={ deleteStyle }>Eliminar</button> : null }
                    { props.admin ? <Link to={`/admin/branches/${props.branch.id}`}><button style={ editStyle }>Editar</button></Link> : null }
                </div>
            </div>
        </div>
    )
}

// Lo mejor seria ponerle un estado de cerrado no?
function deleteBranch(id) {
    axios.delete(`http://127.0.0.1:8000/api/branches/${id}`);
    alert("Se ha borrado con exito")
}

const deleteStyle = {
    background: 'red',
    margin: '5px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'red'
}

const editStyle = {
    background: 'darkgoldenrod',
    margin: '5px',
    color: 'white',
    borderRadius: '5px',
    border: 'darkgoldenrod',
    padding: '0px 15px'
}

export default BranchItem;
