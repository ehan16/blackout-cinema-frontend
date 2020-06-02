import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';

const OrdersList = (props) => {

    const [orders, setOrders] = useState([]);
    let movies = [];
    // let branches = [];
    let clients = [];

    const getOrders = async() => {
        await axios.get('http://127.0.0.1:8000/api/orders/')
        .then(res =>  setOrders(res.data))
        .catch(err => console.log(err));
    }

    const getMovies = async() => {
        await axios.get('http://127.0.0.1:8000/api/movies/')
        .then(res => { movies = res.data })
        .catch(err => console.log(err));
    }

    // const getBranches = async() => {
    //     await axios.get('http://127.0.0.1:8000/api/branches/')
    //     .then(res => { branches = res.data })
    //     .catch(err => console.log(err));
    // }
    
    const getClients = async() => {
        await axios.get('http://127.0.0.1:8000/api/clients/')
        .then(res => { clients = res.data })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getOrders();
        getMovies();
        // getBranches();
        getClients();
    }, []);

    return (
        <div>

            <Banner name="Órdenes de compra"/>
            <div className="row mx-2 px-sm-3 pb-3 pt-2">

                <div className="col mx-md-3 my-5 text-center">
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
                                ? orders.map(order => 
                                    <tr key={ order.order_id }>
                                        <th scope="row">{ order.order_id }</th>
                                        <td className="text-capitalize">{ order.date }</td>
                                        <td className="text-capitalize">{ order.client_id }</td>
                                        <td className="text-capitalize">{ order.movie_id }</td>
                                        {/* <td className="text-capitalize">{ order.branch_id }</td> */}
                                        <td className="text-capitalize">{ order.amount }</td>
                                    </tr>
                                    )
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
