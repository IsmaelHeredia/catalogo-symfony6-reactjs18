import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import Mensajes from "../../../layouts/mensajes/Mensajes";

const url = window.$url_api;

export default class ListarUsuario extends Component {

    constructor(props){
      super(props);
      this.state = {
        usuarios: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/users";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            usuarios: res.data
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    render() {
        return (
          <div>
            <Header />
            <br/>
            <div className="container">
              <h3 align="center">Lista de usuarios</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio"></div>
              <div align="center">
                <a href="/administracion/usuarios/agregar" className="btn btn-primary boton-largo" role="button">Crear nuevo usuario</a>
              </div>
            </div>
            <Footer />
          </div>
        );
    }

    renderList(){
      var { usuarios = [] } = this.props;
      var { isLoaded } = this.state;
      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
          )

      } else {

        return this.state.usuarios.map((usuario)=>{

          return(
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.user_type_name}</td>
              <td>
                <a href={"/administracion/usuarios/" + usuario.id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/administracion/usuarios/" + usuario.id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}