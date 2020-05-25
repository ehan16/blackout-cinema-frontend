import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const ProductForm = (props) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [availability, setAvailability] = useState(0);
    const [product1, setProduct1] = useState("");
    const [product2, setProduct2] = useState("");
    const [product3, setProduct3] = useState("");
    const [product4, setProduct4] = useState("");
    const [product5, setProduct5] = useState("");
    let products = [];

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'price':
                setPrice(value)
                break;
            case 'category':
                setCategory(value)
                break;
            case 'availability':
                setAvailability(value)
                break;
            case 'product1':
                setProduct1(value)
                break;
            case 'product2':
                setProduct2(value)
                break;
            case 'product3':
                setProduct3(value)
                break;
            case 'product4':
                setProduct4(value)
                break;
            case 'product5':
                setProduct5(value)
                break;
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if (name === "" || price < 1 || availability < 1) {

            alert("ERROR: existen campos inválidos"); // Se valida que ningun campo este vacio

        } else {

            if (category === "combo" && product1 === "" && product2 === "" && product3 === "" && product4 === "" && product5 === "") {
                alert("ERROR: combo se encuentra vacío");
            } else {
                const data = {
                    'name_': name,
                    'price': price,
                    'category': category,
                    'availability': availability,
                    'product1': product1,
                    'product2': product2,
                    'product3': product3,
                    'product4': product4,
                    'product5': product5,
                }
                console.log(data)
        
                if (props.edit) {
        
                    const productId = props.match.params.productId; // Se identifica el id del producto a editar
                    if (props.combo) {
                        axios.put(`http://127.0.0.1:8000/api/combos/${productId}/`, data);
                    } else {
                        axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, data);
                    }
        
                } else {

                    if (category === 'combo') {
                        axios.post('http://127.0.0.1:8000/api/combos/', data);
                    } else {
                        axios.post('http://127.0.0.1:8000/api/products/', data);
                    }
        
                }
            }

        }

    }

    useEffect(() => {
        products = axios.get('http://127.0.0.1:8000/api/products/').then(res => {
            res.data.map(product => <option value={product.id} className="text-capitalize">{product.name_}</option>);
        })

        if (props.edit) {
            getProduct();
        }
    }, []);

    const getProduct = async() => {
        const productId = props.match.params.productId; // Se identifica el id de la pelicula a editar
        if (props.combo) {
            await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
            .then(res => {
            setName(res.data.name_);
            setPrice(res.data.price);
            setAvailability(res.data.availability);
            setCategory(res.data.category);
            setProduct1(res.data.product1);
            setProduct2(res.data.product2);
            setProduct3(res.data.product3);
            setProduct4(res.data.product4);
            setProduct5(res.data.product5);
            })
            .catch(err => console.log(err));
        } else {
            await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
            .then(res => {
            setName(res.data.name_);
            setPrice(res.data.price);
            setAvailability(res.data.availability);
            setCategory(res.data.category);
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div>
            <div className="title-style">
                { props.edit ? <h1>Editar producto</h1> : <h1>Agregar producto</h1> }
            </div>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-field" value={name} name="name" id="name" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input type="number" className="form-field" value={price} name="price" id="price" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="availability">Disponibilidad</label>
                    <input type="number" className="form-field" value={availability} name="availability" id="availability" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <select value={category} className="form-field" name="category" id="category" onChange={(e) => handleChange(e)}>
                        <option value="drink">Bebida</option>
                        <option value="popcorn">Cotufa</option>
                        <option value="combo">Combo</option>
                        <option value="sweet">Dulce</option>
                        <option value="food">Comida</option>
                    </select>
                </div>
                {
                    category === 'combo' ? 
                    <div>
                        <label>Productos del combo</label>
                        <select value={product1} className="form-field" name="product1" id="product1" onChange={(e) => handleChange(e)}>
                            <option value={""}>Ninguno</option>
                            { products }
                        </select> 
                        <select value={product2} className="form-field" name="product2" id="product2" onChange={(e) => handleChange(e)}>
                            <option value={""}>Ninguno</option>
                            { products }
                        </select> 
                        <select value={product3} className="form-field" name="product3" id="product3" onChange={(e) => handleChange(e)}>
                            <option value={""}>Ninguno</option>
                            { products }
                        </select> 
                        <select value={product4} className="form-field" name="product4" id="product4" onChange={(e) => handleChange(e)}>
                            <option value={""}>Ninguno</option>
                            { products }
                        </select> 
                        <select value={product5} className="form-field" name="product5" id="product5" onChange={(e) => handleChange(e)}>
                            <option value={""}>Ninguno</option>
                            { products }
                        </select> 
                    </div>
                    : null
                }
                <div className="btn-group mt-3">
                    <Link to="/admin/products"><button type="button" className="btn-form">Cancelar</button></Link>
                    <button type="submit" className="btn-form btn-submit" onClick={ handleSubmit }>Aceptar</button>
                </div>
            </form>
        </div>
    )

}

export default ProductForm;