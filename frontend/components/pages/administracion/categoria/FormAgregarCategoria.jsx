import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormAgregarCategoria extends Component {

    constructor(props) {
      super(props);

      this.state = {
        nombre: "",
        icono: "",
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

      var { nombre, icono } = this.state;

      var url = window.$url_api + "/categories";

      const formData = new FormData();
      formData.append("name", nombre);
      formData.append("icon", icono);

      axios.post(url, 
        formData,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "La categoría fue creada exitosamente", tipo : "success" }));   
          History.push("/administracion/categorias");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando la categoría", tipo : "danger" }));   
          History.push("/administracion/categorias");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando la categoría", tipo : "danger" }));   
        History.push("/administracion/categorias");      
        History.go();
      });

    }

    render() {

        const { nombre, icono } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Categorías</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Categoría</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group mt-3">
                                <label>Icono</label>
                                <input type="file" accept="image/png, image/gif, image/jpeg" required onChange={this.handleFileUpload} />
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
export default FormAgregarCategoria;