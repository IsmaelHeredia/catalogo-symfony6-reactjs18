import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import Mensajes from "../../../layouts/mensajes/Mensajes";

export default class ListarCategoria extends Component {

    constructor(props){
      super(props);
      this.state = {
        categorias: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/categories";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            categorias: res.data
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
              <h3 align="center">Lista de categorías</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Icono</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio" />
              <div align="center">
                <a href="/administracion/categorias/agregar" className="btn btn-primary boton-largo" role="button">Crear una nueva categoría</a>
              </div>
            </div>
            <Footer />
          </div>
        );
    }

    renderList(){
      var { categorias = [] } = this.props;
      var { isLoaded } = this.state;

      var url_imagenes = window.$url_images;

      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
        )
      } else {

        return this.state.categorias.map((categoria)=>{

          return(
            <tr key={categoria.id}>
              <td>{categoria.name}</td>
              <td><img src={url_imagenes + "/" + categoria.icon} className="imagen-lista" /></td>
              <td>
                <a href={"/administracion/categorias/" + categoria.id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/administracion/categorias/" + categoria.id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}