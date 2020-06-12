import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';
import EmployeeTable from '../employees/EmployeeTable'
import ParkingLotList from '../parking lot/ParkingLotList'

const BranchDetail = (props) => {
    
    const [branch, setBranch] = useState('');
    const branchId = props.match.params.branchId;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/branches/${branchId}/`).then(res => {
            setBranch(res.data);
        });
    }, []);


    return (
        <div>
            <Banner name='Detalle de la sucursal' />

            <div className="container-fluid p-3 text-center">

                <div className="row p-4 mx-3">
                    <div className="title-style">
                        <h1>{ branch.zone } - { branch.place }</h1>
                        <h3>{ branch.state_field }, { branch.city }</h3>
                        <h3>{ branch.number_field }</h3>
                    </div>
                </div>
                 
                <div className="row mx-3 px-sm-3 pb-3 pt-2">
                    <ParkingLotList  branchId={branchId} />
                </div>
                <div className="row mx-3 px-sm-3 pb-3 pt-2">
                    <EmployeeTable  branchId={branchId} />
                </div>

            </div>

        </div>
    )

}

export default BranchDetail;
