import React, { useState } from "react";
import axios from 'axios'

const MovieForm = (props) => {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [language, setLanguage] = useState("");
    const [subtitles, setSubtitles] = useState(false);
    const [date, setDate] = useState(new Date());

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
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            genre: genre,
            duration: duration,
            language: language,
            subtitles: subtitles,
            date: date,
        }
        // axios.post(`http://127.0.0.1:8000/api/movies/`, data)
        console.log(data)
    }

    return (
        <div>
            <div className="title-style">
                <h1>Agregar película</h1>
            </div>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="title">Nombre de la película</label>
                    <input type="text" className="form-field" name="title" id="title" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Género</label>
                    <input type="email" className="form-field" name="genre" id="genre" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duración</label>
                    <input type="number" className="form-field" name="duration" id="duration" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Lenguaje</label>
                    <input type="text" className="form-field" name="language" id="language" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="subtitles">Subtítulos</label>
                    <input type="checkbox" name="subtitles" id="subtitles" onChange={(e) => handleChange(e)}></input>
                    <span className="ml-2">Español</span>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha de estreno</label>
                    <input type="date" className="form-field" name="date" id="date" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn-form">Cancelar</button>
                    <button type="submit" className="btn-form btn-submit" onClick={ handleSubmit }>Aceptar</button>
                </div>
            </form>
        </div>
    )

}

export default MovieForm;
