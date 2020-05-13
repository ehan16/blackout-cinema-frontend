import React, { Component } from 'react'
import Banner from '../../Banner'

export class ProductsList extends Component {

    // Movie is passed through the props this.props.movie
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            combos: [],
            toBuy: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Banner name={ this.props.admin ? 'Inventario - Combos' : 'Caramelería'} />
                <div className="container-fluid p-3">
                    <div className="row px-sm-3 py-3">

                        <div className="col-md mx-sm-3 my-3 text-center">
                            <table className="table table-responsive-sm table-hover table-dark list">
                                <thead>
                                    <tr className="bg-danger">
                                        { this.props.admin ? <th scope="col">ID</th> : null}
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Categoría</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        { this.props.admin ? <th scope="row">1</th> : null }
                                        <td>Hola</td>
                                        <td>Hola</td>
                                        <td>Hola</td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                { !this.props.admin ? <button className="btn" style={{ background: '#292929', color: 'red' }}><i className="fa fa-plus"></i></button> : null}
                                                { this.props.admin ? <button className="btn" style={{ background: '#292929', color: 'red' }}><i className="fa fa-pencil"></i></button> : null}
                                                { this.props.admin ? <button className="btn" style={{ background: '#292929', color: 'red' }}><i className="fa fa-trash"></i></button> : null}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        { !this.props.admin ?
                        <div className="col-md mx-sm-3 my-3 text-center">
                            <table className="table table-responsive-sm table-hover table-dark list">
                                <thead>
                                    <tr className="bg-danger">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Categoría</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Hola</td>
                                        <td>Hola</td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button className="btn" style={{ background: '#292929', color: 'red' }}><i className="fa fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="continue" style={ continueStyle }>Continuar</button>
                        </div>
                        : null }

                    </div>
                </div>
            </div>
        )
    }
}

const continueStyle = {
    background: 'red',
    margin: '20px 0px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'red'
}

export default ProductsList
