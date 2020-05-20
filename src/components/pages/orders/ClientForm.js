import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const ClientForm = (props) => {

    const showHideClassName = props.show ? 'modal d-block' : 'd-none';
    // movieID, functionID, products, amount informacion necesaria obtenidos por params o por props
    const [plate, setPlate] = useState("")
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(0);
    const [vehicleType, setVehicleType] = useState("");
    const [id, setId] = useState(4);
    const history = useHistory();
    // const movieId = props.match.params.movieId;
    // const functionId = props.match.params.functionId;

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'phone':
                setNumber(value)
                break;
            case 'vehicleType':
                setVehicleType(value)
                break;
            case 'id':
                setId(value)
                break;
            case 'plate':
                setPlate(value)
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)
        .then(res => {
            // Significa que el cliente ya se encuentra en la base de datos y no se registra en la tabla de clientes
            history.push("/products");
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className={showHideClassName} style={modalStyle}>
        <p>{ props.test }</p>
            <section className="">
                <div className="title-style">
                    <h3>Información del cliente</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="id">Cédula</label>
                        <input type="number" className="form-field" name="id" id="id" onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plate">Placa del carro</label>
                        <input type="text" className="form-field" name="plate" id="plate" onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" className="form-field" name="email" id="email" onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input type="number" className="form-field" name="phone" id="phone" onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="vehicleType">Tipo de vehículo</label>
                        <select name="carType" className="form-field" name="vehicleType" id="vehicleType" onChange={(e) => handleChange(e)}>
                            <option value="1">Sedan</option>
                            <option value="1">Compacto</option>
                            <option value="1">Coupe</option>
                            <option value="1">Hatchback</option>
                            <option value="2">SUV</option>
                            <option value="2">Pickup</option>
                            <option value="2">Familiar</option>
                            <option value="2">Crossover</option>
                        </select>
                    </div>
                    <div className="btn-group">
                        <button className="btn-form" type="button" onClick={props.handleClose}>Cancelar</button>
                        <button className="btn-form btn-submit" type="submit" onClick={ handleSubmit }>Aceptar</button>
                    </div>
                </form>
            </section>
        </div>
    );

}

const modalStyle = {
    background: 'rgba(0, 0, 0, 0.8)'
}

export default ClientForm;
