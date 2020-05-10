import React from 'react'

function MovieItem(props) {
    return (
        <div className="movie">
            <div>
                <h4>{ props.movie.title } <span className="text-capitalize">({ props.movie.language })</span></h4>
                <ul className="mb-0" style={{ listStyleType: 'none' }}>
                    <li>Año: { props.movie.year }</li>
                    <li>Género: { props.movie.genre }</li>
                    <li>Duración: { props.movie.duration } min</li>
                    <li>Puestos: { props.movie.lots }</li>
                    <li>Subtítulos: { props.movie.subtitles ? 'Español' : 'No' }</li>
                </ul>
                { props.movie.on_air 
                    ? <button style={ btnStyle } disabled={ props.movie.lots == 0 } >Reservar</button> 
                    : null
                }
            </div>
        </div>
    )
}

const btnStyle = {
    background: 'red',
    marginTop: '10px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'red'
}

export default MovieItem;
