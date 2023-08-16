import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormEditarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        categorias: [],
        id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        id_categoria: "",
        categoria : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

      var history_url = History.location.pathname;
      var id_producto = history_url.split("productos/").pop().split("/editar").shift();
      var url_api_producto = window.$url_api + "/products/" + id_producto;

      axios.get(url_api_producto, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.id,
            nombre: res.data.name,
            descripcion: res.data.description,
            precio : res.data.price,
            id_categoria : res.data.category
          });       
      }).catch(e => {
          console.log(e);
      });

      var url_api_categoria = window.$url_api + "/categories";
      axios.get(url_api_categoria, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
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

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSelectChange = (event) => {
      this.setState({
        id_categoria: event.target.value
      })
    }

    handleFileUpload = (e) => {
      const file = e.target.files[0];
      this.setState({ imagen : file });
    }
  
    handleSubmit = (e) => {
      e.preventDefault();

      var { id, nombre, descripcion, precio, imagen, id_categoria } = this.state;

      const formData = new FormData();
      formData.append("name", nombre);
      formData.append("description", descripcion);
      formData.append("price", precio);
      formData.append("image", imagen);
      formData.append("category", id_categoria);

      var url = window.$url_api + "/products/" + id;
      axios.post(url, 
        formData,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El producto fue editado exitosamente", tipo : "success" }));   
          History.push("/administracion/productos");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el producto", tipo : "danger" }));   
          History.push("/administracion/productos");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el producto", tipo : "danger" }));   
        History.push("/administracion/productos");      
        History.go();
      });

    }

    render() {

        const { categorias, id, nombre, descripcion, precio, id_categoria } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando el producto {nombre}</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={descripcion} onChange={this.handleChange} className="form-control" rows="3" required />
                              </div>
                              <div className="form-group">
                                <label>Precio</label>
                                <input type="text" name="precio" value={precio} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group mt-3 mb-3">
                                <label>Imagen</label>
                                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={this.handleFileUpload} />
                              </div>
                              <div className="form-group">
                                <label>Categoría</label>
                                <select name="id_categoria" value={id_categoria} onChange={this.handleSelectChange} className="form-control" required>
                                  {categorias.length && categorias.map((item, index) => (
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/administracion/productos" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormEditarProducto;