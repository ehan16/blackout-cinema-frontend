import React, { useState, useEffect } from "react";
import axios from 'axios';

const OrdersList = (props) => {

    let orders = [];
    let movies = [];
    let branches = [];
    let clients = [];

    const getOrders = async() => {
        await axios.get('http://127.0.0.1:8000/api/orders/')
        .then(res => { orders = res.data })
        .catch(err => console.log(err));
    }

    const getMovies = async() => {
        await axios.get('http://127.0.0.1:8000/api/movies/')
        .then(res => { movies = res.data })
        .catch(err => console.log(err));
    }

    const getBranches = async() => {
        await axios.get('http://127.0.0.1:8000/api/branches/')
        .then(res => { branches = res.data })
        .catch(err => console.log(err));
    }
    
    const getClients = async() => {
        await axios.get('http://127.0.0.1:8000/api/clients/')
        .then(res => { clients = res.data })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getOrders();
        getMovies();
        getBranches();
        getClients();
    }, [])

    return (
        <div>

            <div className="title-style">
                <h1>Órdenes de compra</h1>
            </div>

            <div className="row px-sm-3 pb-3 pt-2">

                <div className="col mx-md-3 my-3 text-center">
                    <table className="table table-responsive-sm table-hover table-dark list">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Película</th>
                                {/* <th scope="col">Sucursal</th> */}
                                <th scope="col">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            { orders 
                                ? orders.map(order => {
                                    <tr>
                                        <th scope="row">{ order.id }</th>
                                        <td className="text-capitalize">{ order.date }</td>
                                        <td className="text-capitalize">{ order.client_id }</td>
                                        <td className="text-capitalize">{ order.movie_id }</td>
                                        {/* <td className="text-capitalize">{ order.branch_id }</td> */}
                                        <td className="text-capitalize">{ order.amount }</td>
                                        <td>{ item.price }</td>
                                    </tr>
                                    })
                                : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )

}

export default OrdersList;
