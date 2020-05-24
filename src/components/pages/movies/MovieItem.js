import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function MovieItem(props) {

    return (
        <div className="card movie">
            <div>
                <h4>{ props.movie.title } <span className="text-capitalize">({ props.movie.language })</span></h4>
                <ul className="mb-0" style={{ listStyleType: 'none', paddingBottom: '10px' }}>
                    { props.mode === '' ? <li>ID: { props.movie.id }</li> : null }
                    <li>Año: { props.movie.year }</li>
                    <li>Género: { props.movie.genre }</li>
                    <li>Duración: { props.movie.duration } min</li>
                    <li>Subtítulos: { props.movie.subtitles ? 'Español' : 'No' }</li>
                    { props.mode === 'to-release' ? <li>Fecha de estreno: { props.movie.date }</li> : null }
                </ul>
                <div style={{ display: 'flex' }}>
                    { props.mode === 'on-air'  ? <button style={ deleteStyle }>Detalles</button> : null }
                    { props.mode === ''  ?  <Link to={`/admin/movies/${props.movie.id}`}><button style={ editStyle }>Editar</button></Link> : null } 
                    { props.mode === '' && props.movie.mode === 'estreno' ? <button style={ launchStyle }>Estrenar</button> : null }
                    { props.mode === '' && props.movie.mode === 'cartelera' ? <button style={ launchStyle }>Culminar</button> : null }
                    { props.mode === '' && props.movie.mode === 'cartelera' ? <button style={ launchStyle }>Añadir función</button> : null }
                </div>
            </div>
        </div>
    )

    
}

function launchMovie(id) {
    
}

function takeOutMovie(id) {

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
