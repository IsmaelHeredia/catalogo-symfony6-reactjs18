import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import Mensajes from "../../layouts/mensajes/Mensajes";

import History from "../../../src/History";

class MostrarProducto extends Component {

    constructor(props){
      super(props);
      this.state = {
        producto: [],
        isLoadedProd: false,
      }
    }

    componentDidMount() {
      var history_url = History.location.pathname;
      var id_producto = history_url.split("productos/").pop().split("/cargar").shift();
      var url = window.$url_api + "/products/" + id_producto;
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoadedProd: true,
            producto: res.data
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    render() {
        return (
          <div>
            <Header />
            <div className="container-fluid">
              <br />
              <h3 className="text-center">Bienvenido al catálogo de productos</h3>
              <br/>
              <div className="row">
                {this.renderListProd()}
              </div>
            </div>
            <Footer />
          </div>
        );
    }

    renderListProd(){
      var { producto, isLoadedProd } = this.state;

      var url_imagenes = window.$url_images;

      if (isLoadedProd) {
        return(

            <div className="row">
                <div className="col">
                    <div className="card h-100">
                        <img className="card-img-top imagen-card" src={url_imagenes + "/" + producto.image} alt="" />
                    </div>
                </div>
                <div className="col">
                    <div className="card-body">
                        <h4 className="card-title">{producto.name}</h4>
                        <p className="mt-3 card-text">{producto.description}</p>
                        <b>${producto.price}</b>
                        <br/><br/>
                        <a href={"/categorias/" + producto.id + "/listar"}><span className="badge bg-primary">{producto.category_name}</span></a>
                    </div>                 
                </div>
            </div>
    
          )
      }

    }

}

export default MostrarProducto;