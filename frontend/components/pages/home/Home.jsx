import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import Mensajes from "../../layouts/mensajes/Mensajes";

class Home extends Component {

    constructor(props){
      super(props);
      this.state = {
        productos: [],
        isLoadedProd: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/products";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoadedProd: true,
            productos: res.data
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
      var { productos = [] } = this.props;
      var { isLoadedProd } = this.state;

      var url_imagenes = window.$url_images;

      if (isLoadedProd) {
        return this.state.productos.map((producto)=>{

          return(

            <div key={producto.id} className="col-lg-6 mb-4">
              <div className="card h-100">
                <img className="card-img-top imagen-card" src={url_imagenes + "/" + producto.image} alt="" />
                <div className="card-body text-center">
                  <a href={"/productos/" + producto.id + "/cargar"}><h4 className="card-title">{producto.name}</h4></a>
                  <p className="card-text">{producto.description}</p>
                  <b>${producto.price}</b>
                  <br/><br/>
                  <a href={"/categorias/" + producto.id + "/listar"}><span className="badge bg-primary">{producto.category_name}</span></a>
                </div>
              </div>
            </div>
    
          )

        })
      }

    }

}

export default Home;