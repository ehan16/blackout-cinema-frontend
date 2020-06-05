import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';
import EmployeeTable from '../employees/EmployeeTable'
import ParkingLotList from '../parking lot/ParkingLotList'

const BranchDetail = (props) => {
    
    const branchId = props.match.params.branchId;

    return (
        <div>
            <Banner name='Detalle de la sucursal' />

            <div className="container-fluid p-3 text-center">
                 
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
