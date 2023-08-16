import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

class FormEditarUsuario extends Component {

    constructor(props) {
      super(props);

      this.state = {
        tipos_usuarios: [],
        id : "",
        nombre: "",
        email : "",
        id_tipo : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        var history_url = History.location.pathname;
        var id_usuario = history_url.split("usuarios/").pop().split("/editar").shift();
        var url_api_usuario = window.$url_api + "/users/" + id_usuario;
  
        axios.get(url_api_usuario, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.id,
            nombre: res.data.username,
            email: res.data.email,
            id_tipo : res.data.user_type_id
          });       
      }).catch(e => {
          console.log(e);
      });

      var url = window.$url_api + "/userTypes";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoaded: true,
            tipos_usuarios: res.data
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
        id_tipo: event.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, nombre, email, id_tipo } = this.state;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("user_type", id_tipo);

      var url = window.$url_api + "/users/" + id;
      axios.post(url, 
        formData,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.status;
        if(estado == 1) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El usuario fue creado exitosamente", tipo : "success" }));   
          History.push("/administracion/usuarios");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el usuario", tipo : "danger" }));   
          History.push("/administracion/usuarios");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el usuario", tipo : "danger" }));   
        History.push("/administracion/usuarios");      
        History.go();
      });

    }

    render() {

        const { tipos_usuarios, id, nombre, email, id_tipo } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Usuarios</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Usuario</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" readOnly />
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input type="text" name="email" value={email} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Tipo</label>
                                <select name="id_tipo" value={id_tipo} onChange={this.handleSelectChange} className="form-control" required>
                                  {tipos_usuarios.length && tipos_usuarios.map((item, index) => (
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/administracion/usuarios" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormEditarUsuario;