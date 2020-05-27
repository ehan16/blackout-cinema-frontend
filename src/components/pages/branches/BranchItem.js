import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function BranchItem(props) {

    return (
        <div className="card branch">
            <div>
            <h4>{ props.branch.place }</h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>

                    { props.admin ? <li>ID: { props.branch.id }</li> : null}
                    <li>Estado: { props.branch.state_field }</li>
                    <li>Ciudad: { props.branch.city }</li>
                    <li>Zona: { props.branch.zone }</li>
                    <li>Teléfono: { props.branch.number_field }</li>
                    { props.admin ? <li>Número de empleados: { props.branch.employee }</li> : null}
                    <li>{ props.branch.enable ? 'Activo' : 'Inactivo'}</li>

                </ul>
                <div style={{ display: 'flex' }}>

                    { props.admin ? <button style={ deleteStyle } onClick={() => enableBranch(props.branch)}>{ props.branch.enable ? 'Inhabilitar' : 'Habilitar'}</button> : null }
                    { props.admin ? <Link to={`/admin/branches/${props.branch.id}`}><button style={ editStyle }>Editar</button></Link> : null }

                </div>
            </div>
        </div>
    )
}

// Lo mejor seria ponerle un estado de cerrado no?
function enableBranch(branch) {

    const data = {
        'state_field': branch.state_field,
        'city': branch.city,
        'zone': branch.zone,
        'place': branch.place,
        'number_field': branch.number_field,
        'employee': branch.employee,
        'enable': !branch.enable
    }

    axios.put(`http://127.0.0.1:8000/api/branches/${branch.id}/`, data);
    console.log(data);
    swal("Se ha realizado con éxito");

}

const deleteStyle = {
    background: 'red',
    margin: '5px',
    color: 'white',
    border: 'red'
}

const editStyle = {
    background: 'darkgoldenrod',
    margin: '5px',
    color: 'white',
    border: 'darkgoldenrod',
}

export default BranchItem;
