import React, { Component } from "react";

export class ClientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderID: '',
            clientID: '',
            email: '',
            number: '',
            amount: '',
            movieID: '',
            functionID: '',
            vehicleType: '',
            products: []
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
                        <label>Placa del carro</label>
                        <input type="text" className="form-field"></input>
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" className="form-field"></input>
                    </div>
                    <div className="form-group">
                        <label>Número de teléfono</label>
                        <input type="number" className="form-field"></input>
                    </div>
                    <div className="form-group">
                        <label>Tipo de vehículo</label>
                        <select name="carType" className="form-field">
                            <option value="small">Sedan</option>
                            <option value="small">Compacto</option>
                            <option value="small">Coupe</option>
                            <option value="small">Hatchback</option>
                            <option value="big">SUV</option>
                            <option value="big">Pickup</option>
                            <option value="big">Familiar</option>
                            <option value="big">Crossover</option>
                        </select>
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

export default ClientForm;
