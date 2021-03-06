import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top py-1"
        style={{ background: "#111" }}
      >
        <h1
          className="navbar-brand my-1"
          style={{ color: "red", fontWeight: "bolder" }}
        >
          Blackout cinema
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-4">
            {/* Links del cliente */}
            <Link to="/" className="nav-item nav-link">
              Inicio
            </Link>
            <Link to="/movies/on-air" className="nav-item nav-link">
              Cartelera
            </Link>
            <Link to="/movies/to-release" className="nav-item nav-link">
              Estrenos
            </Link>
            <Link to="/branches" className="nav-item nav-link">
              Sucursales
            </Link>

            <div className="nav-item dropdown">
              {/* Links del admin */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </a>
              <div
                className="dropdown-menu mb-2"
                style={{ background: "#181818" }}
                aria-labelledby="dropMenu"
              >
                <Link
                  to="/admin/movies"
                  className="dropdown-item text-white newHover"
                >
                  Películas
                </Link>
                <Link
                  to="/admin/products"
                  className="dropdown-item text-white newHover"
                >
                  Inventario
                </Link>
                <Link
                  to="/admin/branches"
                  className="dropdown-item text-white newHover"
                >
                  Sucursales
                </Link>
                <Link
                  to="/admin/orders"
                  className="dropdown-item text-white newHover"
                >
                  Órdenes
                </Link>
                <Link
                  to="/admin/record"
                  className="dropdown-item text-white newHover"
                >
                  Histórico
                </Link>
                <Link
                  to="/admin/clients"
                  className="dropdown-item text-white newHover"
                >
                  Clientes
                </Link>
                <Link
                  to="/admin/lang-genre"
                  className="dropdown-item text-white newHover"
                >
                  Lenguajes / Géneros
                </Link>
                <Link
                  to="/admin/total-client"
                  className="dropdown-item text-white newHover"
                >
                  Mejores clientes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

// '#280547' dark purple
// '#470505' dark red

export default Navbar;
