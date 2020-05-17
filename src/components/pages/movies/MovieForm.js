import React, { Component } from "react";

export class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleChange(event) {

    }

    handleSubmit(event) {

    }

    render() {
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
}

export default MovieForm;
