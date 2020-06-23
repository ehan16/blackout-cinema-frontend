import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import BranchItem from "./BranchItem";
import Banner from "../../Banner";

export class BranchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
    };
  }

  componentDidMount() {
    this.getBranches();
  }

  getBranches = () => {
    axios.get("http://127.0.0.1:8000/api/branches/").then((res) => {
      this.setState({ ...this.state, branches: res.data });
    });
  };

  render() {
    return (
      <div>
        <Banner name="Sucursales" />
        <div className="container-fluid p-3">
          {this.props.admin ? (
            <div className="text-center mt-3 mb-4">
              <Link to="/admin/add-branch/">
                <button className="btn-add">Agregar sucursal</button>
              </Link>
            </div>
          ) : null}
          {this.state.branches.map((branch) => (
            <BranchItem
              branch={branch}
              admin={this.props.admin}
              deleteBranch={this.deleteBranch}
            />
          ))}
        </div>
      </div>
    );
  }

  deleteBranch = (branch) => {
    const data = {
      state_field: branch.state_field,
      city: branch.city,
      zone: branch.zone,
      place: branch.place,
      number_field: branch.number_field,
      enable: !branch.enable,
    };

    // Se confirma si realmente desea eliminar
    swal({
      title: "Confimación",
      text: "Una vez que lo elimine, no podrá recuperarlo. ¿Seguro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://127.0.0.1:8000/api/branches/${branch.branchs_id}/`, data)
          .then((res) => {
            this.getBranches();
            swal("Exitoso", "¡Se ha eliminado con éxito!", "info", {
              dangerMode: true,
            });
          });
      } else {
        swal("No ha ocurrido nada", { dangerMode: true });
      }
    });
  };
}

export default BranchList;
