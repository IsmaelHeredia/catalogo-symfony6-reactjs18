import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../../layouts/admin/header";
import Footer from "../../../layouts/admin/footer";

import History from "../../../../src/History";

const url = window.$url_api;

class FormCambiarUsuario extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id: "",
        usuario: "",
        nuevo_usuario: "",
        clave_actual: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var url = window.$url_api;     

      var token = sessionStorage.getItem(window.$nombre_session);
      var url_check = url + "/auth/validate";

      axios.post(url_check, {"token" : token})
      .then(res => {
        console.log(res);
        console.log(res.data);   
        this.setState({
            isLoaded: true,
            id : res.data.token.data.id,
            usuario: res.data.token.data.username
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

      var { id, usuario, nuevo_usuario, clave_actual } = this.state;

      var url_acceso = window.$url_api + "/auth/login";

      axios.post(url_acceso, {"username" : usuario, "password" : clave_actual})
        .then(res => {
 
          if(res.data.token != null) {

            var url_cuenta = window.$url_api + "/account/changeUsername";

            const formData = new FormData();
            formData.append("username", usuario);
            formData.append("password", clave_actual);
            formData.append("new_username", nuevo_usuario);

            axios.post(url_cuenta, formData, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
            .then(res2 => {

                console.log(res2);
                console.log(res2.data);

                if(res2.data.status == 1) {
                    sessionStorage.setItem(window.$nombre_session, "");
                    sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El nombre de usuario fue cambiado correctamente", tipo : "success" }));   
                    History.push("/ingreso");      
                    History.go();

                } else {
                    sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrio un error cambiando el usuario", tipo : "warning" }));   
                    History.push("/administracion/cambiarUsuario");      
                    History.go();
                }     
            }).catch(e2 => {
                console.log(e2);
            });

          } else {
            sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ingreso inválido", tipo : "warning" }));   
            History.push("/administracion/cambiarUsuario");      
            History.go();
          }     
      }).catch(e => {
          console.log(e);
      });

    }

    render() {

        const { _id, usuario, nuevo_usuario, clave_actual } = this.state;

        return (
          <div>
            <Header />
            <br/>
            <div className="container">
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Cambiar usuario</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <input type="hidden" name="_id" value={_id} onChange={this.handleChange} />
                              <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" name="usuario" value={usuario} onChange={this.handleChange} className="form-control" readOnly />
                              </div>
                              <div className="form-group">
                                <label>Nuevo usuario</label>
                                <input type="text" name="nuevo_usuario" value={nuevo_usuario} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Clave actual</label>
                                <input type="password" name="clave_actual" value={clave_actual} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="text-center mt-3">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
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
export default FormCambiarUsuario;