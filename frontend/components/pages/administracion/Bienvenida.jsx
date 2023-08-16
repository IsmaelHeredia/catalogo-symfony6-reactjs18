import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/admin/header";
import Footer from "../../layouts/admin/footer";

import Mensajes from "../../layouts/mensajes/Mensajes";

class Bienvenida extends Component {

    render() {

        return (
          <div>
            <Header />
            <br />
            <h3 align="center">Bienvenido</h3>
            <Footer />
          </div>
        );
    }
}

export default Bienvenida;