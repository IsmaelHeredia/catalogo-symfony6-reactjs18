import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom";
import axios from "axios";

class Mensajes extends Component {
    render() {

      if(sessionStorage.getItem(window.$nombre_session_mensaje) != null && sessionStorage.getItem(window.$nombre_session_mensaje) != "") 
      {
        var mensaje_obj = JSON.parse(sessionStorage.getItem(window.$nombre_session_mensaje));

        var texto = mensaje_obj.texto;
        var tipo = mensaje_obj.tipo;

        if(tipo == "success") 
        {
          toast.success(texto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
        else if(tipo == "warning") 
        {
          toast.warning(texto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });        
        }
        else if(tipo == "danger") 
        {
          toast.error(texto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });        
        }

        sessionStorage.setItem(window.$nombre_session_mensaje,"");

        return (
        <div>
          <ToastContainer />
        </div>
        );

      } else 
      {
        return (
          <div>
            <ToastContainer />
          </div>
          );
      }
    }
}
export default Mensajes;