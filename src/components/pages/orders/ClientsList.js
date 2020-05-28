import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';

const ClientsList = (props) => {

    let clients = ['ii'];

    const getClients = async() => {
        await axios.get('http://127.0.0.1:8000/api/clients/')
        .then(res => { clients = res.data })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getClients();
    }, [])

    return (
        <div>

            <Banner name="Clientes"/>
            <div className="row px-sm-3 pb-3 pt-2">

                <div className="col mx-md-3 my-5 text-center">
                    <table className="table table-responsive-sm table-hover table-dark list">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Email</th>
                                <th scope="col">Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            { clients 
                                ? clients.map(client => 
                                    <tr>
                                        <th scope="row">{ client.id }</th>
                                        <td className="text-capitalize">{ client.plate }</td>
                                        <td className="text-capitalize">{ client.email }</td>
                                        <td className="text-capitalize">{ client.phone }</td>
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

export default ClientsList;
