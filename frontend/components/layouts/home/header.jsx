import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../../../src/App.css";

import Mensajes from "../mensajes/Mensajes";

class Header extends Component {

    constructor(props){
      super(props);
      this.state = {
        categorias: [],
        isLoaded: false,
      }
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

    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand text-center" href="#">Catálogo de productos</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="/">Inicio <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" id="themes">Categorías <span className="caret"></span></a>
                          <div className="dropdown-menu" aria-labelledby="categorias">
                            {this.renderList()}
                          </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/about">About</a>
                    </li>                    
                  </ul>
          
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="/ingreso">Ingresar</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        );
    }

    renderList(){
      var { categorias = [] } = this.props;
      var { isLoaded } = this.state;

      var url_imagenes = window.$url_images;

      if (isLoaded) {
        return this.state.categorias.map((categoria)=>{

          return(
            <a key={categoria.id} className="dropdown-item" href={"/categorias/" + categoria.id + "/listar" }><img className="imagen-icono" src={url_imagenes + "/" + categoria.icon}/> {categoria.name}</a>
          )

        })
      }

    }


}

export default Header;