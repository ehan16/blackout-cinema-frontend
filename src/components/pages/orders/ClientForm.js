import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const ClientForm = (props) => {
  // Variables de la clase
  const showHideClassName = props.show ? "modal d-block" : "d-none";
  const [plate, setPlate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [vehicleType, setVehicleType] = useState("1");
  const [id, setId] = useState(0);
  const history = useHistory();
  const functionId = props.functionId;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "vehicleType":
        setVehicleType(value);
        break;
      case "id":
        setId(value);
        break;
      case "plate":
        setPlate(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      phone < 1 ||
      phone.toString().length < 11 ||
      id < 1 ||
      id.toString().length < 6 ||
      plate.trim() === ""
    ) {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/clients/${id}/`)
        .then((res) => {
          // Significa que el cliente ya se encuentra en la BBDD y no se registra en la tabla de clientes
          const clientId = res.data.client_id;
          insertOrder(clientId);
        })
        .catch((err) => {
          const client = {
            email: email,
            phone: phone,
            plate: plate.toUpperCase(),
            identification: id,
          };

          // Se agrega al nuevo cliente
          axios
            .post("http://127.0.0.1:8000/api/clients/", client)
            .then((res) => insertOrder(res.data.client_id));
        });
    }
  };

  const insertOrder = (clientId) => {
    let price = vehicleType === "1" ? 10 : 20;
    const amount = parseInt(props.amount, 10) + price; // El precio de los productos se convierte en un int

    const order = {
      movie_id: props.movieId,
      client_id: clientId,
      amount: amount,
      function: functionId,
    };

    // Se agrega la orden de compra
    axios.post("http://127.0.0.1:8000/api/orders/", order).then((res) => {
      console.log(res.data);
      insertProducts(res.data.order_id);
      updateLots(functionId);
      swal(
        "Compra exitosa",
        `Su orden de compra es ${res.data.order_id}`,
        "info",
        { dangerMode: true }
      );
      history.push("/"); // Se devuelve al cliente al home
    });
  };

  const insertProducts = (orderId) => {
    // Se inserta cada producto adquirido en el historico
    props.buyList.map((product) => {
      const data = {
        product_id: product.product.product_id,
        order_id: orderId,
        combo_id: product.product.combo_id,
        qty: product.qty,
      };

      axios.post("http://127.0.0.1:8000/api/record/", data);
      if (product.product.product_id !== undefined) {
        updateProduct(product.product.product_id);
      }
    });
  };

  const updateProduct = (productId) => {
    // Se tiene que actualizar la cantidad disponible de productos
    axios.get(`http://127.0.0.1:8000/api/products/${productId}`).then((res) => {
      const productDetail = res.data;
      const data = {
        name: productDetail.name,
        availability: parseInt(productDetail.availability, 10) - 1, // Por precaucion se hace la conversion
        price: productDetail.price,
        category: productDetail.category,
        enable: productDetail.enable,
      };
      axios.put(`http://127.0.0.1:8000/api/functions/${functionId}`, data);
    });
  };

  const updateLots = (functionId) => {
    // Se tiene que actualizar la cantidad de puestos
    axios
      .get(`http://127.0.0.1:8000/api/functions/${functionId}`)
      .then((res) => {
        const functionDetail = res.data;
        const data = {
          parking_lot: functionDetail.parking_lot,
          lot: parseInt(functionDetail.lot, 10) - 1, // Por precaucion se hace la conversion
          date: functionDetail.date,
          movie_id: functionDetail.movie_id,
        };
        axios.put(`http://127.0.0.1:8000/api/functions/${functionId}`, data);
      });
  };

  return (
    <div className={showHideClassName} style={modalStyle}>
      <section className="">
        <div className="title-style">
          <h3>Información del cliente</h3>
        </div>
        {/* Formulario para los datos del cliente */}
        <form>
          <div className="form-group">
            <label htmlFor="id">Cédula</label>
            <input
              type="number"
              className="form-field"
              name="id"
              id="id"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="plate">Placa del carro</label>
            <input
              type="text"
              className="form-field"
              name="plate"
              id="plate"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              className="form-field"
              name="email"
              id="email"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Número de teléfono</label>
            <input
              type="number"
              className="form-field"
              name="phone"
              id="phone"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="vehicleType">Tipo de vehículo</label>
            <select
              className="form-field"
              name="vehicleType"
              id="vehicleType"
              onChange={(e) => handleChange(e)}
            >
              <option value="1">Sedan</option>
              <option value="1">Compacto</option>
              <option value="1">Coupe</option>
              <option value="2">SUV</option>
              <option value="2">Pickup</option>
              <option value="2">Familiar</option>
            </select>
          </div>
          {/* Botones de accion */}
          <div className="btn-group my-3">
            <button
              className="btn-form"
              type="button"
              onClick={props.handleClose}
            >
              Cancelar
            </button>
            <button
              className="btn-form btn-submit"
              type="submit"
              onClick={handleSubmit}
            >
              Aceptar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const modalStyle = {
  background: "rgba(0, 0, 0, 0.9)",
  overflow: "auto",
};

export default ClientForm;
