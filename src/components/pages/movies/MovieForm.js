import React, { useState } from "react";
import axios from 'axios'

const MovieForm = (props) => {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);
    const [language, setLanguage] = useState("");
    const [subtitles, setSubtitles] = useState(false);
    const [date, setDate] = useState(new Date());

    handleChange = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Nombre de la película</label>
                    <input type="text" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Género</label>
                    <input type="email" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Duración</label>
                    <input type="number" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Lenguaje</label>
                    <input type="text" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Subtítulos</label>
                    <input type="checkbox"></input>
                </div>
                <div className="form-group">
                    <label>Fecha de estreno</label>
                    <input type="date" className="form-field"></input>
                </div>
                <div className="btn-group">
                    <button type="button">Cancelar</button>
                    <button type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    );

}

export default MovieForm;
