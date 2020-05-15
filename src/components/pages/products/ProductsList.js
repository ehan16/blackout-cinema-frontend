import React, { Component } from 'react'
import Banner from '../../Banner'
import ProductRow from './ProductRow'
import axios from 'axios'

export class ProductsList extends Component {

    // Movie is passed through the props this.props.movie
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            buyList: ['joli'],
            nume: [1]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/products/').then(res => {
            this.setState({...this.state, products: res.data})
        });

        axios.get('http://127.0.0.1:8000/api/combos/').then(res => {
            this.setState({...this.state, product: [...this.state.products, res.data]})
        })
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
                                        { this.props.admin ? <th scope="col">IDs : Qty</th> : null}
                                        <th scope="col">Categoría</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Acción { this.state.nume }</th>
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
                            <button className="continue" style={ continueStyle }>Continuar</button>
                        </div>
                        : null }

                    </div>
                </div>
            </div>
        )
    }

    addToBuyList = (newProduct) => { this.setState({ buyList: [...this.state.buyList, newProduct] }) };

    deleteInBuyList = (index) => { this.setState(state => {
        const buyList = state.buyList.filter((item, i) => index !== i);
        return { buyList, };
    }) }

}

const continueStyle = {
    background: 'red',
    margin: '20px 0px',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: 'red'
}

const btnStyle = {
    background: '#292929',
    color: 'red'
}

export default ProductsList
