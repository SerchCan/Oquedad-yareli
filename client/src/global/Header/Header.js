import React, { Component } from 'react';
import logoUcaribe from './images/logoUcaribe.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    Row,
    Button
} from 'reactstrap';
import Login from './Forms/Login'
import Register from './Forms/Register'
import axios from 'axios'

class Header extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this);

    }
    logout() {

        axios.post("http://localhost:80/Server/Auth/logout.php", { withCredentials: true }).then(res => {
            this.setState({ isLogged: false, id: 0 });
        })

    }
    render() {
        return (

            <Navbar color="light" light expand="md" >
                <NavbarBrand className="col-md-8" href="/"> <img src={logoUcaribe} width="200" className="Ucaribe-logo" alt="logo" />
                    <h4 className="text-left">OQUEDAD</h4>
                </NavbarBrand>
                {this.props.isLogged ? <Button onClick={this.logout}>Cerrar Sesión</Button> : <Row> <Register /> <Login /> </Row>}

            </Navbar >
        );
    }
}

export default Header;
