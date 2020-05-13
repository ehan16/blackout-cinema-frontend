import React from 'react'

function MovieItem(props) {
    return (
        <div className="card movie">
            <div>
                <h4>{ props.movie.title } <span className="text-capitalize">({ props.movie.language })</span></h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>
                    { props.mode === '' ? <li>ID: { props.movie.id }</li> : null }
                    { props.movie.year !== undefined ? <li>Año: { props.movie.year }</li> : null}
                    <li>Género: { props.movie.genre }</li>
                    <li>Duración: { props.movie.duration } min</li>
                    { props.mode === 'on-air' ? <li>Puestos: { props.movie.lots }</li> : null }
                    { props.mode === 'on-air' ? <li>Sucursal: { props.movie.lots }</li> : null }
                    <li>Subtítulos: { props.movie.subtitles ? 'Español' : 'No' }</li>
                    { props.mode === 'to-release' ? <li>Fecha de estreno: { props.movie.date }</li> : null }
                </ul>
                <div style={{ display: 'flex' }}>
                    { props.mode === 'on-air'  ? <button style={ deleteStyle } disabled={ props.movie.lots == 0 } >Reservar</button> : null }
                    {/* { props.mode === ''  ?  <button style={ deleteStyle }>Eliminar</button> : null }  */}
                    { props.mode === ''  ?  <button style={ editStyle }>Editar</button> : null } 
                    { props.movie.date !== undefined ? <button style={ launchStyle }>Estrenar</button> : null }
                    { props.movie.year === undefined ? <button style={ launchStyle }>Culminar</button> : null }
                    { props.movie.year === undefined ? <button style={ launchStyle }>Añadir función</button> : null }
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

const launchStyle = {
    background: 'darkgreen',
    margin: '5px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'darkgreen'
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

export default MovieItem;
