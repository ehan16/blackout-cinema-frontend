import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';

const OrdersList = (props) => {

    const [orders, setOrders] = useState([]);

    const getOrders = async() => {
        await axios.get('http://127.0.0.1:8000/api/orders/')
        .then(res =>  {
            setOrders(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        getOrders();
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
                                {/* <th scope="col">Función</th> */}
                                <th scope="col">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            { orders 
                                ? orders.map(order => 
                                    <tr key={ order.order_id }>
                                        <th scope="row">{ order.order_id }</th>
                                        <td className="text-capitalize">{ order.date }</td>
                                        <td>{ order.client_id.email } - C.I.: { order.client_id.identification }</td>
                                        <td className="text-capitalize">{ order.movie_id.title }</td>
                                        {/* <td className="text-capitalize">{ order.function.parking_lot }</td> */}
                                        {/* <td className="text-capitalize">{ order.function.function_id }</td> */}
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
