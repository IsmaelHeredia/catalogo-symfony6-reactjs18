import React, { Component } from "react";
import "../../../src/App.css";

import Mensajes from "../mensajes/Mensajes";

class Header extends Component {
    render() {
        return (
            <div>
              <Mensajes />
            </div>
        );
    }
}

export default Header;