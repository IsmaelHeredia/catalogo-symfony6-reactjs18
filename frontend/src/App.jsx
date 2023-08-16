window.$url_back = "http://localhost:3000";
window.$url_images = window.$url_back + "/uploads";
window.$url_api = window.$url_back + "/api";
window.$nombre_session = "react_session";
window.$nombre_session_mensaje = "mensaje_session";

import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import ReactDOM from "react-dom";
import axios from "axios";

import "bootswatch/dist/journal/bootstrap.min.css"
import $ from "jquery";
import { createPopper } from "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";

import About from "../components/pages/about/About";

import FormIngreso from "../components/pages/ingreso/FormIngreso";

import Home from "../components/pages/home/Home";
import ListarProductos from "../components/pages/home/ListarProductos";
import MostrarProducto from "../components/pages/home/MostrarProducto";

import RutasNormales from "../components/RutasNormales";
import ProtegerRutas from "../components/ProtegerRutas";
import ProtegerRutasAdmin from "../components/ProtegerRutasAdmin";

import Bienvenida from "../components/pages/administracion/Bienvenida";

import Categoria from "../components/pages/administracion/categoria/ListarCategoria";
import FormAgregarCategoria from "../components/pages/administracion/categoria/FormAgregarCategoria";
import FormEditarCategoria from "../components/pages/administracion/categoria/FormEditarCategoria";
import FormBorrarCategoria from "../components/pages/administracion/categoria/FormBorrarCategoria";

import Producto from "../components/pages/administracion/producto/ListarProducto";
import FormAgregarProducto from "../components/pages/administracion/producto/FormAgregarProducto";
import FormEditarProducto from "../components/pages/administracion/producto/FormEditarProducto";
import FormBorrarProducto from "../components/pages/administracion/producto/FormBorrarProducto";

import Usuario from "../components/pages/administracion/usuario/ListarUsuario";
import FormAgregarUsuario from "../components/pages/administracion/usuario/FormAgregarUsuario";
import FormEditarUsuario from "../components/pages/administracion/usuario/FormEditarUsuario";
import FormBorrarUsuario from "../components/pages/administracion/usuario/FormBorrarUsuario";

import FormCambiarUsuario from "../components/pages/administracion/cuenta/FormCambiarUsuario";
import FormCambiarClave from "../components/pages/administracion/cuenta/FormCambiarClave";

// Efecto de cargando en las peticiones axios

axios.interceptors.request.use(function (config) {

  document.body.classList.add('loading-indicator');

  return config
}, function (error) {
  return Promise.reject(error);
});

  axios.interceptors.response.use(function (response) {

  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {
  return Promise.reject(error);
});

// Rutas

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/categorias/:id/listar" element={<ListarProductos/>} />
        <Route path="/productos/:id/cargar" element={<MostrarProducto/>} />
        <Route element={<RutasNormales />}>
          <Route path="/ingreso" element={<FormIngreso />} />
        </Route>
        <Route element={<ProtegerRutas />}>
          <Route path="/administracion" element={<Bienvenida/>} />
          <Route path="/administracion/categorias" element={<Categoria/>} />
          <Route path="/administracion/categorias/agregar" element={<FormAgregarCategoria/>} />
          <Route path="/administracion/categorias/:id/editar" element={<FormEditarCategoria/>} />
          <Route path="/administracion/categorias/:id/borrar" element={<FormBorrarCategoria/>} />
          <Route path="/administracion/productos" element={<Producto/>} />
          <Route path="/administracion/productos/agregar" element={<FormAgregarProducto/>} />
          <Route path="/administracion/productos/:id/editar" element={<FormEditarProducto/>} />
          <Route path="/administracion/productos/:id/borrar" element={<FormBorrarProducto/>} />
          <Route path="/administracion/cambiarUsuario" element={<FormCambiarUsuario/>} />
          <Route path="/administracion/cambiarClave" element={<FormCambiarClave/>} />
        </Route>
        <Route element={<ProtegerRutasAdmin />}>
          <Route path="/administracion/usuarios" element={<Usuario/>} />
          <Route path="/administracion/usuarios/agregar" element={<FormAgregarUsuario/>} />
          <Route path="/administracion/usuarios/:id/editar" element={<FormEditarUsuario/>} />
          <Route path="/administracion/usuarios/:id/borrar" element={<FormBorrarUsuario/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}