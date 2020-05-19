import React, { useState, useEffect } from "react";
import axios from 'axios'

// const ClientForm = (props) => {

//     const orderID, movieID, functionID, products;
//     const [email, setEmail] = useState("");
//     const [number, setNumber] = useState(0);
//     const [amount, setAmount] = useState(0);
//     const [vehicleType, setVehicleType] = useState("");
//     const [clientID, setClientID] = useState("");

//     handleChange = (e) => {
//         e.preventDefault();
//         const {name, value} = e.currentTarget;
//         switch (name) {

//         }
//     }

//     return (
//                     <div>
//                         <form>
//                             <div className="form-group">
//                                 <label>Placa del carro</label>
//                                 <input type="text" className="form-field"></input>
//                             </div>
//                             <div className="form-group">
//                                 <label>Correo electrónico</label>
//                                 <input type="email" className="form-field"></input>
//                             </div>
//                             <div className="form-group">
//                                 <label>Número de teléfono</label>
//                                 <input type="number" className="form-field"></input>
//                             </div>
//                             <div className="form-group">
//                                 <label>Tipo de vehículo</label>
//                                 <select name="carType" className="form-field">
//                                     <option value="small">Sedan</option>
//                                     <option value="small">Compacto</option>
//                                     <option value="small">Coupe</option>
//                                     <option value="small">Hatchback</option>
//                                     <option value="big">SUV</option>
//                                     <option value="big">Pickup</option>
//                                     <option value="big">Familiar</option>
//                                     <option value="big">Crossover</option>
//                                 </select>
//                             </div>
//                             <div className="btn-group">
//                                 <button type="button">Cancelar</button>
//                                 <button type="submit">Aceptar</button>
//                             </div>
//                     </form>
//                   </div>
//                 );



// }


const ClientForm = (props) => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         orderID: '',
    //         clientID: '', // Cedula
    //         plate: '',
    //         email: '',
    //         number: '',
    //         amount: '',
    //         movieID: '',
    //         functionID: '',
    //         vehicleType: '',
    //         products: []
    //     }
    // }
    // const orderID, movieID, functionID, products, amount;
    const [plate, setPlate] = useState("")
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(0);
    const [vehicleType, setVehicleType] = useState("");
    const [id, setId] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'number':
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
        
    }

    const getParams = async() => {
        
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="id">Cédula</label>
                    <input type="number" className="form-field" name="id" id="id"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="plate">Placa del carro</label>
                    <input type="text" className="form-field" name="plate" id="plate"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" className="form-field" name="email" id="email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="number">Número de teléfono</label>
                    <input type="number" className="form-field" name="number" id="number"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleType">Tipo de vehículo</label>
                    <select name="carType" className="form-field" name="vehicleType" id="vehicleType">
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
                    <button className="btn-form" type="button">Cancelar</button>
                    <button className="btn-form btn-submit" type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    );

}

export default ClientForm;
