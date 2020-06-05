import React, { useState, useEffect } from "react";
import axios from 'axios';

const ParkingLotList = (props) => {

    const [parkingLots, setParkingLots] = useState([]);

    const getParkingLots = async() => {
        await axios.get('http://127.0.0.1:8000/api/parkingLots/')
        .then(res =>  {
            setParkingLots(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        getParkingLots();
    }, []);

    return (
        <div>

            <div className="row mx-2 px-sm-3 pb-3 pt-2">

                <div className="text-center">
                        <Link to="/admin/add-movie/"><button className="btn-add" >Agregar película</button></Link>
                </div>

                <div className="col mx-md-3 my-5 text-center">
                    <table className="table table-responsive-sm table-hover table-dark list">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Capacidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            { parkingLots 
                                ? parkingLots.map(parkingLot => 
                                    <tr key={ parkingLot.order_id }>
                                        <th scope="row">{ parkingLot.parking_id }</th>
                                        <td className="text-capitalize">{ parkingLot.branch.zone } - { parkingLot.branch.place }</td>
                                        <td className="text-capitalize">50</td>
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

export default ParkingLotList;
