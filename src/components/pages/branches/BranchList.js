import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import BranchItem from './BranchItem';
import Banner from '../../Banner';

export class BranchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branches: [
                {
                    id: 2,
                    state_field: 'Miranda',
                    city: 'Caracas',
                    zone: 'Las Mercedes',
                    place: 'Plaza Alfredo Sadel',
                    number_field: '0212-315132',
                    employee: 5,
                    enable: true
                },
            ]
        }
    }

    componentDidMount() {
        // axios.get('http://127.0.0.1:8000/api/branches/').then(res => {
        //     this.setState({...this.state, branches: res.data})
        // });
    }

    render() {
        return (
            <div>
                <Banner name="Sucursales"/>
                <div className="container-fluid p-3">
                    {
                        this.props.admin ?
                        <div className="text-center">
                            <Link to="/admin/add-branch/"><button className="btn-add" >Agregar sucursal</button></Link>
                        </div>
                        : null
                    }
                    { 
                        this.state.branches.map( (branch) => (
                            <BranchItem key={branch.id} branch={ branch } admin={ this.props.admin } /> 
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default BranchList
