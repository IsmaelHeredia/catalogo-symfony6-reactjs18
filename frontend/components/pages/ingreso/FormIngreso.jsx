import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/login/header";
import Footer from "../../layouts/login/footer";

import History from "../../../src/History";

const url = window.$url_api;

class FormIngreso extends Component {

    constructor(props) {
      super(props);

      this.state = {
        usuario: "",
        clave: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var url = window.$url_api;     
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { usuario, clave } = this.state;

      var url = window.$url_api + "/auth/login";

      axios.post(url, {"username" : usuario, "password" : clave})
        .then(res => {
          console.log(res);
          console.log(res.data);    
          if(res.data.token != null) {
            var token = res.data.token;
            sessionStorage.setItem(window.$nombre_session, token);
            sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Bienvenido", tipo : "success" }));   
            History.push("/administracion");      
            History.go();
          } else {
           sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ingreso inválido", tipo : "warning" }));   
           History.push("/ingreso");      
           History.go();
          }     
      }).catch(e => {
          console.log(e);
      });

    }

    render() {

        const { usuario, clave } = this.state;

        return (
          <div>
            <Header />
            <br/>
            <div className="container">
              <div className="card card-primary ingreso">
                  <div className="card-header bg-primary">Ingreso</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" name="usuario" value={usuario} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Clave</label>
                                <input type="password" name="clave" value={clave} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="text-center mt-3">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Ingresar</button>
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
export default FormIngreso;