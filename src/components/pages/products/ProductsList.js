import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Banner from '../../Banner';
import ClientForm from '../orders/ClientForm';
import ProductTable from './ProductTable';

export class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            products: [],
            combos: [],
            buyList: [],
            amount: 0
        }
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/products/').then(res => {
            this.setState({...this.state, products: res.data})
        });
        axios.get('http://127.0.0.1:8000/api/combos/').then(res => {
            this.setState({...this.state, combos: res.data})
        })
        
    }

    render() {

        const movieId = this.props.match.params.movieId;
        const functionId = this.props.match.params.functionId;

        return (
            <div>

                <Banner name={ this.props.admin ? 'Inventario - Combos' : 'Caramelería'} />
                { !this.props.admin 
                    ? <ClientForm show={this.state.show} amount={this.state.amount} handleClose={this.hideModal} buyList={this.state.buyList} movieId={movieId} functionId={functionId} /> 
                : null }

                <div className="container-fluid p-3 text-center">
                    
                    { this.props.admin ?
                        <div className="text-center my-3">
                            <Link to="/admin/add-product/"><button className="btn-add" >Agregar producto / combo</button></Link>
                        </div>
                    : null }

                    <div className="row mx-3 px-sm-3 pb-3 pt-2">

                        <div className="col-md mx-md-3 text-center">

                            <h4 style={{ color: 'red', marginBottom: '20px' }}>Productos</h4>
                            {/* Tabla de combos */}
                            <ProductTable products={this.state.combos} combo={true} admin={this.props.admin} buy={false} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />
                            {/* Tabla de productos */}
                            <ProductTable products={this.state.products} combo={false} admin={this.props.admin} buy={false} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />

                        </div>
                        
                        {/* Lista de compras del cliente */}
                        { !this.props.admin ?
                            <div className="col-md mx-md-3 text-center">
                                <h4 style={{ color: 'red', marginBottom: '20px' }}>Lista de compra</h4>
                                <ProductTable products={this.state.buyList} combo={false} admin={this.props.admin} buy={true} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />
                                <button className="continue" style={ continueStyle } onClick={this.showModal}>Continuar</button>
                            </div>
                        : null }

                    </div>

                </div>
            </div>
        )
    }

    addProduct = (newProduct) => { 
        const newAmount = this.state.amount + parseInt(newProduct.price, 10);
        this.setState({ buyList: [...this.state.buyList, newProduct], amount: newAmount }) 
    };
    
    deleteProduct = (index) => { 
        this.setState(state => {
            const price = parseInt(this.state.buyList[index].price, 10);
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
    margin: '20px 0px',
}

export default ProductsList
