import React, { Component } from 'react'
import Banner from '../../Banner'
import ProductRow from './ProductRow'
import axios from 'axios'
import {Link} from 'react-router-dom';
import ClientForm from '../orders/ClientForm'

export class ProductsList extends Component {

    // Movie and function is passed through the props or it could be in the params
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            products: [],
            buyList: ['joli'],
            amount: 0
        }
    }

    componentDidMount() {

        //No hay conexion
        // axios.get('http://127.0.0.1:8000/api/products/').then(res => {
        //     this.setState({...this.state, products: res.data})
        // });

        // axios.get('http://127.0.0.1:8000/api/combos/').then(res => {
        //     this.setState({...this.state, product: [...this.state.products, res.data]})
        // })
        
    }

    render() {
        return (
            <div>
                <Banner name={ this.props.admin ? 'Inventario - Combos' : 'Caramelería'} />
                <ClientForm show={this.state.show} handleClose={this.hideModal} buyList={this.state.buyList}/>
                <div className="container-fluid p-3 text-center">
                        
                    { this.props.admin ? <button style={continueStyle} >Agregar</button> : null }

                    <div className="row px-sm-3 pb-3 pt-2">

                        <div className="col-md mx-sm-3 my-3 text-center">
                            <table className="table table-responsive-sm table-hover table-dark list">
                                <thead>
                                    <tr className="bg-danger">
                                        { this.props.admin ? <th scope="col">ID</th> : null}
                                        <th scope="col">Nombre</th>
                                        { this.props.admin ? <th scope="col">Items</th> : null}
                                        <th scope="col">Categoría</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.buyList.map((item, index) => 
                                        <ProductRow admin={this.props.admin} item={index} index={index} buy={false} addToBuyList={this.addToBuyList}/>
                                    ) }
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
                                    { this.state.buyList.map((item, index) => 
                                        <ProductRow admin={this.props.admin} item={item} index={index} buy={true} deleteInBuyList={this.deleteInBuyList} />
                                    ) }
                                </tbody>
                            </table>
                            <button className="continue" style={ continueStyle } onClick={this.showModal}>Continuar</button>
                        </div>
                        : null }

                    </div>
                </div>
            </div>
        )
    }

    addToBuyList = (newProduct) => { this.setState({ buyList: [...this.state.buyList, newProduct], amount: (this.state.amount + newProduct.price) }) };

    deleteInBuyList = (index) => { this.setState(state => {
        const price = this.state.buyList[index].price;
        const buyList = state.buyList.filter((item, i) => index !== i);
        const amount = this.state.amount - price;
        return { buyList, amount };
    }) }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
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
