import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const ClientForm = (props) => {

    const showHideClassName = props.show ? 'modal d-block' : 'd-none';
    // const [name, setName] = useState("")
    const [plate, setPlate] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [vehicleType, setVehicleType] = useState("1");
    const [id, setId] = useState(0);
    const history = useHistory();
    const products = props.buyList.map(item => { return item.id }); // Se llena la lista con los ids de los productos nada mas
    const functionId = props.functionId;

    const handleChange = (e) => {

        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            // case 'name':
            //     setName(value)
            //     break;
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
        if (email === '' || phone < 1 || id < 1 || plate === '') {

            // Se valida que ningun campo este vacio
            swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });

        } else {

            let price = 10;
            const orderId = "";
            if (vehicleType === '2') { price = 20; }
            const amount = parseInt(props.amount, 10) + price; // El precio de los productos se convierte en un int

            const order = {
                movie_id: props.movieId,
                client_id: id,
                amount: amount,
                function_id: functionId,
                branch_id: props.branchId
            };

            axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)
            .then(res => { 
                // Significa que el cliente ya se encuentra en la BBDD y no se registra en la tabla de clientes
            })
            .catch(err => {
                
                const client = {
                    id: id,
                    // name: name,
                    email: email,
                    phone: phone,
                    vehicleType: vehicleType,
                    plate: plate
                };
                
                // Se agrega al nuevo cliente
                axios.post('http://127.0.0.1:8000/api/clients/', client);
                console.log(client)
                
            });

            // Se agrega la orden de compra
            axios.post('http://127.0.0.1:8000/api/orders/', order)
            .then(res => {
                console.log(res.data); // Se consigue cual es el id de la orden de compra
                this.insertProducts(orderId); 
                this.updateLots(functionId);
            }); 
            console.log(order);

            
            // alert("Compra existosa. Su orden de compra es " + orderId);
            swal("Compra exitosa", `Su orden de compra es ${orderId}`, "info", { dangerMode: true });
            history.push("/"); // Se devuelve al cliente al home
            
        }
        
    }

    const insertProducts = (orderId) => {
        // Se inserta cada producto adquirido en el historico
        products.map(product => {
            const data = {
                product_id: product,
                order_id: orderId
            };
            axios.post('http://127.0.0.1:8000/api/record/', data);
        })
    }

    const updateLots = (functionId) => {
        // Se tiene que actualizar la cantidad de puestos
        axios.get(`http://127.0.0.1:8000/api/functions/${functionId}`).then(res => {
            const functionDetail = res.data;
            const data = {
                branch: functionDetail.branch,
                lot: (parseInt(functionDetail.lot, 10) - 1), // Por precaucion se hace la conversion
                date: functionDetail.date,
                movie_id: functionDetail.movie_id
            };
            axios.put(`http://127.0.0.1:8000/api/functions/${functionId}`, data);
        })

    }

    return (

        <div className={showHideClassName} style={modalStyle}>
            <section className="">
                <div className="title-style">
                    <h3>Información del cliente</h3>
                </div>
                <form>
                    {/* <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-field" name="name" id="name" onChange={(e) => handleChange(e)}></input>
                    </div> */}
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
