import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormBorrarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id: "",
        nombre: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var history_url = History.location.pathname;
      var id_producto = history_url.split("productos/").pop().split("/borrar").shift();
      var url = window.$url_api + "/products/" + id_producto;
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.id,
            nombre: res.data.name
          });          
      }).catch(e => {
          console.log(e);
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, nombre } = this.state;
      
      var url = window.$url_api + "/products/" + id;
      axios.delete(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El producto fue borrado exitosamente", tipo : "success" }));   
          History.push("/administracion/productos");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error borrando el producto", tipo : "danger" }));   
          History.push("/administracion/productos");      
          History.go();
        }
      });

    }

    render() {

        const { id, nombre } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                        <div className="text-center">
                            <h1 className="display-3">Eliminacíon</h1>
                            <p className="lead">¿Estás seguro que deseas eliminar el producto { nombre }</p>
                            <p className="lead">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-danger boton-largo">Borrar</button>
                                <a href="/administracion/productos" className="btn btn-info boton-largo center-block">Atrás</a>
                            </p>
                        </div>
                    </fieldset>
                  </form>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}
export default FormBorrarProducto;