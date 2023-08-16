import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormEditarCategoria extends Component {

    constructor(props) {
      super(props);

      console.log(props);

      this.state = {
        id : "",
        nombre: "",
        icono: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var history_url = History.location.pathname;
      var id_categoria = history_url.split("categorias/").pop().split("/editar").shift();
      var url = window.$url_api + "/categories/" + id_categoria;
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

    handleFileUpload = (e) => {
      const file = e.target.files[0];
      this.setState({ icono : file });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, nombre, icono} = this.state;
      
      var url = window.$url_api + "/categories/" + id;

      const formData = new FormData();
      formData.append("name", nombre);
      formData.append("icon", icono);

      axios.post(url, 
        formData,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "La categoría fue editada exitosamente", tipo : "success" }));   
          History.push("/administracion/categorias");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando la categoría", tipo : "danger" }));   
          History.push("/administracion/categorias");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando la categoría", tipo : "danger" }));   
        History.push("/administracion/categorias");      
        History.go();
      });

    }

    render() {

        const { id, nombre, icono } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Categorías</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando la categoría {nombre}</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group mt-3">
                                <label>Icono</label>
                                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={this.handleFileUpload} />
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/administracion/categorias" className="btn btn-info boton-largo center-block">Atrás</a>
                                  </p>
                              </div>               
                          </form>
                      </div>
                  </div>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}
export default FormEditarCategoria;