import React, { Component } from 'react'
import BranchItem from './BranchItem'
import Banner from '../../Banner'

export class BranchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branches: [
                {
                    id: 2,
                    state: 'Miranda',
                    city: 'Caracas',
                    zone: 'Las Mercedes',
                    place: 'Plaza Alfredo Sadel',
                    number: '0212-315132',
                    employees: 5
                },
                {
                    id: 2,
                    state: 'Miranda',
                    city: 'Caracas',
                    zone: 'Las Mercedes',
                    place: 'Plaza Alfredo Sadel',
                    number: '0212-315132',
                    employees: 5
                }
            ]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Banner name="Sucursales"/>
                <div className="container-fluid p-3">
                    { 
                        this.state.branches.map( (branch) => (
                            <BranchItem branch={ branch } admin={ this.props.admin } /> 
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default BranchList
