import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const ClientForm = (props) => {

    const showHideClassName = props.show ? 'modal d-block' : 'd-none';
    const [name, setName] = useState("")
    const [plate, setPlate] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [vehicleType, setVehicleType] = useState("1");
    const [id, setId] = useState(0);
    const history = useHistory();
    const products = props.buyList.map(item => { return item.id }); // Se llena la lista con los ids de los productos nada mas
    // const movieId = props.match.params.movieId;
    // const functionId = props.match.params.functionId;
    // const branchId = props.match.params.branchId;

    const handleChange = (e) => {

        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'phone':
                setPhone(value)
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
        if (name === '' || email === '' || phone < 1 || id < 1 || plate === '') {

            alert("ERROR: existen campos inválidos"); // Se valida que ningun campo este vacio

        } else {

            const price = 10;
            const orderId = "";
            const aux = parseInt(props.amount, 10); // Se convierte el monto de los productos en int
            if (vehicleType == '2') { price = 20; }
            const amount = aux + price; 

            const order = {
                // 'movie_id': movieId,
                client_id: id,
                // products: 
                amount: amount,
                // function_id = functionID,
            };

            axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)
            .then(res => {
                // Significa que el cliente ya se encuentra en la base de datos y no se registra en la tabla de clientes
                // axios.post('http://127.0.0.1:8000/api/orders/', order)
                // .then(res => console.log(res.data));
                console.log(order)
                
                alert("Compra existosa. Su orden de compra es " + orderId);
                history.push("/");
            })
            .catch(err => {
                // Se agrega el nuevo cliente
                const client = {
                    'id': id,
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'vehicleType': vehicleType,
                    'plate': plate
                };
                
                // axios.post('http://127.0.0.1:8000/api/clients/', client);
                console.log(client)
                
                // Se agrega la orden de compra
                // axios.post('http://127.0.0.1:8000/api/orders/', order)
                // .then(res => console.log(res.data));
                alert("Compra existosa. Su orden de compra es " + orderId);
                console.log(order)
                
            });
            
        }
        
    }

    return (

        <div className={showHideClassName} style={modalStyle}>
            <section className="">
                <div className="title-style">
                    <h3>Información del cliente</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-field" name="name" id="name" onChange={(e) => handleChange(e)}></input>
                    </div>
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
                        <select className="form-field" name="vehicleType" id="vehicleType" onChange={(e) => handleChange(e)}>
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
    background: 'rgba(0, 0, 0, 0.9)',
    overflow: 'auto'
}

export default ClientForm;
