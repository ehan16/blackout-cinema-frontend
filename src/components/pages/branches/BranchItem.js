import React from 'react'

function BranchItem(props) {
    return (
        <div className="card branch">
            <div>
            <h4>{ props.branch.place }</h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>
                    { props.admin ? <li>ID: { props.branch.id }</li> : null}
                    <li>Estado: { props.branch.state }</li>
                    <li>City: { props.branch.city }</li>
                    <li>Zona: { props.branch.zone }</li>
                    <li>Teléfono: { props.branch.number }</li>
                    { props.admin ? <li>Número de empleados: { props.branch.employees }</li> : null}
                </ul>
                <div style={{ display: 'flex' }}>
                    { props.admin ? <button style={ deleteStyle }>Eliminar</button> : null }
                    { props.admin ? <button style={ editStyle }>Editar</button> : null }
                </div>
            </div>
        </div>
    )

    
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
    padding: '5px',
    borderRadius: '5px',
    border: 'darkgoldenrod',
    padding: '0px 15px'
}

export default BranchItem;
