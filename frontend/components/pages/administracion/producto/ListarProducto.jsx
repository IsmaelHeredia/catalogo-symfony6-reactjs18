import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import Mensajes from "../../../layouts/mensajes/Mensajes";

const url = window.$url_api;

export default class ListarProducto extends Component {

    constructor(props){
      super(props);
      this.state = {
        productos: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/products";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            productos: res.data
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
              <h3 align="center">Lista de productos</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Imagen</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio"></div>
              <div align="center">
                <a href="/administracion/productos/agregar" className="btn btn-primary boton-largo" role="button">Crear nuevo producto</a>
              </div>
            </div>
            <Footer />
          </div>
        );
    }

    renderList(){
      var { productos = [] } = this.props;
      var { isLoaded } = this.state;

      var url_imagenes = window.$url_images;

      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
        )
      } else {

        return this.state.productos.map((producto)=>{

          return(
            <tr key={producto.id}>
              <td>{producto.name}</td>
              <td>{producto.category_name}</td>
              <td><img src={url_imagenes + "/" + producto.image} className="imagen-lista" /></td>
              <td>
                <a href={"/administracion/productos/" + producto.id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/administracion/productos/" + producto.id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}