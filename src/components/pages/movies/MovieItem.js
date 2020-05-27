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
                    <li className="text-capitalize">Género: { props.movie.genre }</li>
                    <li>Duración: { props.movie.duration } min</li>
                    <li>Subtítulos: { props.movie.subtitles ? 'Español' : 'No' }</li>
                    { props.mode === 'to-release' ? <li>Fecha de estreno: { props.movie.date }</li> : null }
                </ul>
                <div >
                    { props.mode === 'on-air'  ? <button style={ buttonStyle }>Detalles</button> : null }
                    { props.mode === ''  ?  <Link to={`/admin/movies/${props.movie.id}`}><button style={ editStyle }>Editar</button></Link> : null } 
                    { props.mode === '' && props.movie.mode === 'estreno' ? <button style={ buttonStyle } onClick={() => launchMovie(props.movie)}>Estrenar</button> : null }
                    { props.mode === '' && props.movie.mode === 'cartelera' ? <button style={ buttonStyle } onClick={() => takeOutMovie(props.movie)}>Culminar</button> : null }
                    { props.mode === '' && props.movie.mode === 'cartelera' ? <Link to={`/admin/movie/${props.movie.id}/add-function`}><button style={ buttonStyle }> + Función</button></Link> : null }
                </div>
            </div>
        </div>
    )

    
}

function launchMovie(movie) {
    const data = {
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        duration: movie.duration,
        language: movie.language,
        subtitles: movie.language,
        synopsys: movie.synopsys,
        date: movie.date,
        mode: 'cartelera'
    };
    console.log(movie);
    // axios.put(`http://127.0.0.1:8000/api/movies/${movie.id}`, data);
}

function takeOutMovie(movie) {
    const data = {
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        duration: movie.duration,
        language: movie.language,
        subtitles: movie.language,
        synopsys: movie.synopsys,
        date: movie.date,
        mode: 'pasada'
    };
    console.log(movie);
    // axios.put(`http://127.0.0.1:8000/api/movies/${movie.id}`, data);
}

const buttonStyle = {
    background: 'red',
    margin: '5px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'red'
}

const editStyle = {
    // background: 'darkgoldenrod',
    background: 'darkgreen',
    margin: '5px',
    color: 'white',
    borderRadius: '5px',
    border: 'darkgreen',
    padding: '5px 15px'
}

export default MovieItem;
