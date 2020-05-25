import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const MovieForm = (props) => {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [language, setLanguage] = useState("");
    const [subtitles, setSubtitles] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('estreno');
    const [synopsys, setSynopsys] = useState("");
    const [year, setYear] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'title':
                setTitle(value)
                break;
            case 'genre':
                setGenre(value)
                break;
            case 'year':
                setYear(value)
                break;
            case 'duration':    
                setDuration(value)
                break;
            case 'language':
                setLanguage(value)
                break;
            case 'subtitles':
                setSubtitles(value)
                break;
            case 'date':
                setDate(value)
                break;
            case 'mode':
                setMode(value)
                break;
            case 'synopsys':
                setSynopsys(value)
                break;
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if (title === "" || genre === "" || duration < 1 || language === "" || synopsys === "" || year < 1) {

            alert("ERROR: existen campos inválidos"); // Se valida que ningun campo este vacio

        } else {
            
            const data = {
                title: title,
                genre: genre,
                duration: duration,
                language: language,
                subtitles: subtitles,
                date: date,
                mode: mode,
                synopsys: synopsys,
                year: year
            }
    
            if (props.edit) {
                const movieId = props.match.params.movieId; // Se identifica el id de la pelicula a editar
                axios.put(`http://127.0.0.1:8000/api/movies/${movieId}/`, data);
                console.log(data, 'Modo edicion');
            } else {
                axios.post('http://127.0.0.1:8000/api/movies/', data);
                console.log(data, 'Modo agregar');
            }
        
        }
    }

    const getMovie = async() => {
        const movieId = props.match.params.movieId; // Se identifica el id de la pelicula a editar
        await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
        .then(res => {
            setTitle(res.data.title);
            setGenre(res.data.genre);
            setYear(res.data.year);
            setDuration(res.data.duration);
            setLanguage(res.data.language);
            setSubtitles(res.data.subtitles);
            setDate(res.data.date);
            setMode(res.data.mode);
            setSynopsys(res.data.synopsys);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.edit) {
            getMovie();
        }
    }, [])

    return (
        <div>
            <div className="title-style">
                { props.edit ? <h1>Editar película</h1> : <h1>Agregar película</h1> }
            </div>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="title">Nombre de la película</label>
                    <input type="text" className="form-field" value={title} name="title" id="title" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Género</label>
                    <input type="text" className="form-field" value={genre} name="genre" id="genre" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duración</label>
                    <input type="number" className="form-field" value={duration} name="duration" id="duration" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Año</label>
                    <input type="number" className="form-field" value={year} name="year" id="year" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="synopsys">Descripción</label>
                    <textarea className="form-field" value={synopsys} name="synopsys" id="synopsys" onChange={(e) => handleChange(e)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Lenguaje</label>
                    <input type="text" className="form-field" value={language} name="language" id="language" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="subtitles">Subtítulos</label>
                    <input type="checkbox" value={subtitles} name="subtitles" id="subtitles" onChange={(e) => handleChange(e)}></input>
                    <span className="ml-2">Español</span>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha de estreno</label>
                    <input type="date" className="form-field" value={date} name="date" id="date" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="mode">Estado</label>
                    <select value={mode} name="mode" id="mode" className="form-field" onChange={(e) => handleChange(e)}>
                        <option value="estreno">Estreno</option>
                        <option value="cartelera">Cartelera</option>
                        <option value="pasada">Pasada</option>
                    </select>
                </div>
                <div className="btn-group">
                    <Link to="/admin/movies"><button type="button" className="btn-form">Cancelar</button></Link>
                    <button type="submit" className="btn-form btn-submit" onClick={ handleSubmit }>Aceptar</button>
                </div>
            </form>
        </div>
    )

}

export default MovieForm;
