import React from 'react'
import {Link} from 'react-router-dom';

function BranchItem(props) {

    return (
        <div className="card branch">
            <div>
            <h4>{ props.branch.place }</h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>

                    { props.admin ? <li>ID: { props.branch.branchs_id }</li> : null}
                    <li>Estado: { props.branch.state_field }</li>
                    <li>Ciudad: { props.branch.city }</li>
                    <li>Zona: { props.branch.zone }</li>
                    <li>Teléfono: { props.branch.number_field }</li>
                    <li>{ props.branch.enable ? 'Activo' : 'Inactivo'}</li>

                </ul>
                <div style={{ display: 'flex' }}>

                    { props.admin ? <button style={ deleteStyle } onClick={() => props.deleteBranch(props.branch)}>{ props.branch.enable ? 'Inhabilitar' : 'Habilitar'}</button> : null }
                    { props.admin ? <Link to={`/admin/branches/${props.branch.branchs_id}`}><button style={ editStyle }>Editar</button></Link> : null }
                    { props.admin ? <Link to={`/admin/branch/${props.branch.branchs_id}`}><button style={ editStyle }>Detalles</button></Link> : null }

                </div>
            </div>
        </div>
    )
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
