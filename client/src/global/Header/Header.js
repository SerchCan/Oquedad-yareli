import React, { Component } from 'react';
import logoUcaribe from './images/logoUcaribe.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand
} from 'reactstrap';


class Header extends Component {
    render() {
        return (
            <Navbar color="light" light expand="md" >
                <NavbarBrand href="/"> <img src={logoUcaribe} width="200" className="Ucaribe-logo" alt="logo" />
                    <h4 class="text-center">OQUEDAD</h4>
                </NavbarBrand>
            </Navbar>
        );
    }
}

export default Header;
