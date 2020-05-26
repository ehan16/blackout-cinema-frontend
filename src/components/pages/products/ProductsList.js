import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Banner from '../../Banner'
import ProductRow from './ProductRow'
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

        // axios.get('http://127.0.0.1:8000/api/products/').then(res => {
        //     this.setState({...this.state, products: res.data})
        // });

        // axios.get('http://127.0.0.1:8000/api/combos/').then(res => {
        //     this.setState({...this.state, product: [...this.state.products, res.data]})
        // })
        
    }

    render() {

        const movieId = this.props.match.movieId;
        const functionId = this.props.match.params.functionId;
        const branchId = this.props.match.params.branchId;

        return (
            <div>
                <Banner name={ this.props.admin ? 'Inventario - Combos' : 'Caramelería'} />
                { !this.props.admin 
                    ? <ClientForm show={this.state.show} handleClose={this.hideModal} buyList={this.state.buyList} movieId={movieId} branchId={branchId} functionId={functionId} /> 
                    : null 
                }
                <div className="container-fluid p-3 text-center">
                    
                    {
                        this.props.admin ?
                        <div className="text-center">
                            <Link to="/admin/add-product/"><button className="btn-add" >Agregar producto</button></Link>
                        </div>
                        : null
                    }

                    <div className="row px-sm-3 pb-3 pt-2">

                        <div className="col-md mx-md-3 my-3 text-center">
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
                                        <ProductRow admin={this.props.admin} item={item} index={index} buy={false} addToBuyList={this.addToBuyList}/>
                                    ) }
                                </tbody>
                            </table>
                        </div>
                        
                        { !this.props.admin ?
                        <div className="col-md mx-md-3 my-3 text-center">
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
