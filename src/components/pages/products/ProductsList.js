import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Banner from "../../Banner";
import ClientForm from "../orders/ClientForm";
import ProductTable from "./ProductTable";

export class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      products: [],
      combos: [],
      buyList: [],
      amount: 0,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios.get("http://127.0.0.1:8000/api/products/").then((res) => {
      this.setState({ ...this.state, products: res.data });
    });
    axios.get("http://127.0.0.1:8000/api/combos/").then((res) => {
      this.setState({ ...this.state, combos: res.data });
    });
  };

  render() {
    const movieId = this.props.match.params.movieId;
    const functionId = this.props.match.params.functionId;

    return (
      <div>
        <Banner
          name={this.props.admin ? "Inventario - Combos" : "Caramelería"}
        />

        {/* Modal del formulario cuando se compra */}
        {!this.props.admin ? (
          <ClientForm
            show={this.state.show}
            amount={this.state.amount}
            handleClose={this.hideModal}
            buyList={this.state.buyList}
            movieId={movieId}
            functionId={functionId}
          />
        ) : null}

        <div className="container-fluid p-3 text-center">
          {this.props.admin ? (
            <div className="text-center my-3">
              <Link to="/admin/add-product/">
                <button className="btn-add">Agregar producto / combo</button>
              </Link>
            </div>
          ) : null}

          <div className="row mx-3 px-sm-3 pb-3 pt-2">
            <div className="col-md mx-md-3 text-center">
              <h4 style={{ color: "red", marginBottom: "20px" }}>Productos</h4>
              {/* Tabla de combos */}
              <ProductTable
                products={this.state.combos}
                combo={true}
                admin={this.props.admin}
                buy={false}
                addProduct={this.addProduct}
                deleteProduct={this.deleteProduct}
                disableProduct={this.disableProduct}
              />
              {/* Tabla de productos */}
              <ProductTable
                products={this.state.products}
                combo={false}
                admin={this.props.admin}
                buy={false}
                addProduct={this.addProduct}
                deleteProduct={this.deleteProduct}
                disableProduct={this.disableProduct}
              />
            </div>

            {/* Lista de compras del cliente */}
            {!this.props.admin ? (
              <div className="col-md mx-md-3 text-center">
                <h4 style={{ color: "red", marginBottom: "20px" }}>
                  Lista de compra
                </h4>
                <ProductTable
                  products={this.state.buyList}
                  combo={false}
                  admin={this.props.admin}
                  buy={true}
                  addProduct={this.addProduct}
                  deleteProduct={this.deleteProduct}
                  disableProduct={this.disableProduct}
                />
                <button
                  className="continue"
                  style={continueStyle}
                  onClick={this.showModal}
                >
                  Continuar
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  addProduct = (newProduct) => {
    const newAmount = this.state.amount + parseInt(newProduct.price, 10);
    const index = this.state.buyList.findIndex(
      (item) => item.product === newProduct
    );

    if (index === -1) {
      // Si el indice es -1, se inserta por primera vez el producto
      this.setState({
        buyList: [...this.state.buyList, { product: newProduct, qty: 1 }],
        amount: newAmount,
      });
    } else {
      // De resto, se actualiza la cantidad
      // Se convierte en entero para evitar errores
      const newQty = parseInt(this.state.buyList[index].qty, 10) + 1;

      this.setState({
        buyList: [
          ...this.state.buyList.slice(0, index),
          { product: newProduct, qty: newQty },
          ...this.state.buyList.slice(index + 1),
        ],
        amount: newAmount,
      });
    }
  };

  deleteProduct = (index) => {
    this.setState((state) => {
      const price = parseInt(this.state.buyList[index].product.price, 10);
      const auxQty = parseInt(this.state.buyList[index].qty, 10);
      const product = this.state.buyList[index].product;
      let buyList = [];

      if (auxQty === 1) {
        buyList = state.buyList.filter((item, i) => index !== i);
      } else {
        buyList = [
          ...this.state.buyList.slice(0, index),
          { product: product, qty: auxQty - 1 },
          ...this.state.buyList.slice(index + 1),
        ];
      }
      const amount = parseInt(this.state.amount, 10) - price;
      return { buyList, amount };
    });
  };

  disableProduct = (product, isProduct) => {
    // Metodo para que el admin deshabilite productos
    let data;

    if (isProduct) {
      data = {
        name: product.name,
        price: product.price,
        category: product.category,
        availability: product.availability,
        enable: false,
      };
    } else {
      data = {
        name: product.name,
        price: product.price,
        availability: product.availability,
        enable: false,
      };
    }

    swal({
      title: "Confimación",
      text: "Una vez que lo elimine, no podrá cambiarlo. ¿Seguro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const id = isProduct ? product.product_id : product.combo_id;
        const mode = isProduct ? 'products' : 'combos';
        axios
          .put(`http://127.0.0.1:8000/api/${mode}/${id}/`, data)
          .then((res) => {
            this.getProducts(); // Se actualiza la informacion mostrada
            swal("Exitoso", "¡Se ha eliminado el producto!", "info", {
              dangerMode: true,
            });
          });
      } else {
        swal("No ha ocurrido nada", { dangerMode: true });
      }
    });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
}

const continueStyle = {
  margin: "20px 0px",
};

export default ProductsList;
