import React, { useState, useEffect } from "react";
import axios from 'axios'

const MovieForm = (props) => {

    // const movie;
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [language, setLanguage] = useState("");
    const [subtitles, setSubtitles] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('estreno');
    const [synopsys, setSynopsys] = useState("");

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
        const data = {
            title: title,
            genre: genre,
            duration: duration,
            language: language,
            subtitles: subtitles,
            date: date,
            mode: mode,
            synopsys: synopsys
        }
        // axios.post(`http://127.0.0.1:8000/api/movies/`, data)
        console.log(data)
    }

    const getMovie = async() => {
        const id = 4
        await axios.get(`/movieshttp://127.0.0.1:8000/api/movies/${id}/`)
        .then(res => {
            // movie = res.data;
            setTitle(res.data.title);
            setGenre(res.data.genre);
            setDuration(res.data.duration);
            setLanguage(res.data.language);
            setSubtitles(res.data.subtitles);
            setDate(res.data.date);
            setMode(res.data.mode);
            setSynopsys(res.data.synopsys);
        })
    }

    // useEffect(() => {
        // Metodo
    // }, [])

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
                    <label htmlFor="synopsys">Descripción</label>
                    <textarea className="form-field" name="synopsys" id="synopsys" onChange={(e) => handleChange(e)}></textarea>
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
                <div className="form-group">
                    <label htmlFor="mode">Estado</label>
                    <select name="mode" id="mode" className="form-field" onChange={(e) => handleChange(e)}>
                        <option value="estreno">Estreno</option>
                        <option value="cartelera">Cartelera</option>
                        <option value="pasada">Pasada</option>
                    </select>
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
