import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ProductForm = (props) => {
  // Variables de la clase
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [category, setCategory] = useState("popcorn");
  const [availability, setAvailability] = useState(1);
  const [productInputs, setProductInputs] = useState([{ id: "" }]);
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    // eslint-disable-next-line default-case
    switch (name) {
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "availability":
        setAvailability(value);
        break;
    }
  };

  const handleProductChange = (e) => {
    const aux = [...productInputs];
    aux[e.target.dataset.id][e.target.name] = e.target.value;
    setProductInputs(aux);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || price < 1 || availability < 1) {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {
      const data = {
        name,
        price,
        category,
        availability,
        enable: true,
      };

      console.log(data);

      if (props.edit) {
        const productId = props.match.params.productId; // Se identifica el id del producto a editar
        if (props.combo) {
          axios.put(`http://127.0.0.1:8000/api/combos/${productId}/`, data);
        } else {
          axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, data);
        }
      } else {
        if (category === "combo") {
          axios
            .post("http://127.0.0.1:8000/api/combos/", data)
            .then((res) => insertProducts(res.data.combo_id));
        } else {
          axios.post("http://127.0.0.1:8000/api/products/", data);
        }
      }

      window.location.replace("http://localhost:3000/admin/products");
    }
  };

  useEffect(() => {
    // Se tiene que buscar todos los productos de la BBDD para presentarlos
    axios.get("http://127.0.0.1:8000/api/products/").then((res) => {
      setProducts(res.data);
      if (props.edit) {
        getProduct();
      }
    });
  }, []);

  const getProduct = async () => {
    const productId = props.match.params.productId; // Se identifica el id del producto a editar
    if (props.combo) {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/combos/${productId}/`
      );
      setName(res.data.name);
      setPrice(res.data.price);
      setAvailability(100);
      setCategory("combo");
    } else {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/${productId}/`
      );
      setName(res.data.name);
      setPrice(res.data.price);
      setAvailability(res.data.availability);
      setCategory(res.data.category);
    }
  };

  const addNewProduct = () => {
    setProductInputs((prevProducts) => [...prevProducts, { id: "" }]);
  };

  const insertProducts = (combo_id) => {
    console.log(combo_id);
    console.log(productInputs);
    productInputs.map(product => {

      const data = {
        product_id: product.id,
        combo_id,
      }

      console.log(data);

      axios.post('http://127.0.0.1:8000/api/combo-product/', data );
    })
  }

  return (
    <div>
      <div className="title-style">
        {props.edit ? <h1>Editar producto</h1> : <h1>Agregar producto</h1>}
      </div>
      <form method="post">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-field"
            value={name}
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            className="form-field"
            value={price}
            name="price"
            id="price"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Disponibilidad</label>
          <input
            type="number"
            className="form-field"
            value={availability}
            name="availability"
            id="availability"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            value={category}
            className="form-field"
            name="category"
            id="category"
            onChange={(e) => handleChange(e)}
          >
            <option value="drink">Bebida</option>
            <option value="popcorn">Cotufa</option>
            <option value="combo">Combo</option>
            <option value="sweet">Dulce</option>
            <option value="food">Comida</option>
          </select>
        </div>
        {category === "combo" ? (
          <div className="mt-5">
            <h5 className="font-weight-bold">Productos del combo</h5>
            <button
              type="button"
              className="w-100 my-3"
              onClick={addNewProduct}
            >
              Agregar producto
            </button>
            <div className="form-group">
              {productInputs.map((item, index) => (
                <select
                  key={index}
                  value={item.id}
                  data-id={index}
                  className="form-field my-2"
                  name="id"
                  onChange={handleProductChange}
                >
                  <option value={""}>Ninguno</option>
                  {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        ) : null}

        <div className="btn-group mt-3">
          <Link to="/admin/products">
            <button type="button" className="btn-form">
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="btn-form btn-submit"
            onClick={handleSubmit}
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
