import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormAgregarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        categorias: [],
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        id_categoria: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleFileUpload = (e) => {
      const file = e.target.files[0];
      this.setState({ imagen : file });
    }

    handleSelectChange = (event) => {
      this.setState({
        id_categoria: event.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { nombre, descripcion, precio, imagen, id_categoria } = this.state;

      const formData = new FormData();
      formData.append("name", nombre);
      formData.append("description", descripcion);
      formData.append("price", precio);
      formData.append("image", imagen);
      formData.append("category", id_categoria);

      var url = window.$url_api + "/products";
      axios.post(url, 
        formData,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El producto fue creado exitosamente", tipo : "success" }));   
          History.push("/administracion/productos");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el producto", tipo : "danger" }));   
          History.push("/administracion/productos");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el producto", tipo : "danger" }));   
        History.push("/administracion/productos");      
        History.go();
      });

    }

    render() {

        const { categorias, nombre, descripcion, precio, id_categoria } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Producto</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
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
                                <input type="file" accept="image/png, image/gif, image/jpeg" required onChange={this.handleFileUpload} />
                              </div>
                              <div className="form-group">
                                <label>Categoría</label>
                                <select name="id_categoria" value={id_categoria} onChange={this.handleSelectChange} className="form-control" required>
                                  <option value="" disabled>Seleccione una categoria</option>
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
export default FormAgregarProducto;