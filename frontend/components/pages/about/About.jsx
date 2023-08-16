import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import Mensajes from "../../layouts/mensajes/Mensajes";

class About extends Component {

    render() {
        return (
          <div>
            <Header />
            <div className="container-fluid">
              <br />
              <div className="text-center">
                <h1>About</h1>
                <br/>
                <h3>Nombre del proyecto  : Catalogo de productos</h3>
                <h3>Version : 1.0</h3>
                <h3>Descripción : Ejemplo de un catalogo de productos</h3>
                <h3>Backend  : Symfony 6 Rest API</h3>
                <h3>Frontend : ReactJS 18.2</h3>
                <h3>Autor : Ismael Heredia</h3>
              </div>
              <br/>
            </div>
            <Footer />
          </div>
        );
    }

}

export default About;