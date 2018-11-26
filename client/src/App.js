import React, { Component } from 'react';
import { Navbar, NavbarBrand, Row, Button, Col, Label, Form, FormGroup, Input, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import logoUcaribe from './global/Home/Header/images/logoUcaribe.png'

import Home from './global/Home/Home';
import Dashboard from './global/Dashboard/dashboard';
import AddProject from './global/Dashboard/Admin/AddProject/Add';
import EditProject from './global/Dashboard/Admin/EditProject/Edit';
import RemoveProject from './global/Dashboard/Admin/RemoveProject/Remove';
import axios from 'axios'
import qs from 'qs'
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLogged: false,
            id: 0,
            modal1: false,
            modal2: false,
            Name: '',
            LastName: '',
            Mail1: '',
            Mail2: '',
            Password1: '',
            Password2: ''
        }
        this.toggle1 = this.toggle1.bind(this)
        this.toggle2 = this.toggle2.bind(this)
        this.Handler = this.Handler.bind(this)
        this.submit1 = this.submit1.bind(this)
        this.submit2 = this.submit2.bind(this)
        this.logout = this.logout.bind(this)
    }
    //Handle logout
    logout() {
        axios.post("http://localhost:80/Server/Auth/logout.php", { withCredentials: true }).then(res => {
            this.setState({ isLogged: false, id: 0 });
        })

    }
    //Modal1
    toggle1() {
        this.setState({ modal1: !this.state.modal1 })
    }
    //Modal2
    toggle2() {
        this.setState({ modal2: !this.state.modal2 })
    }
    //onChange event
    Handler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    // Signup
    submit1() {
        const Params = {
            Name: this.state.Name,
            LastName: this.state.LastName,
            Mail: this.state.Mail1,
            Password: this.state.Password1
        }
        axios.post('http://localhost:80/Server/Auth/register.php', qs.stringify(Params), { withCredentials: true }).then(res => {
            res = res.data;
            console.log(res);
            if (res.code != 0) {
                //handle error
                alert(res.message)
            } else {
                //handle success
                alert("Registro exitoso")
            }
        });
        this.toggle1();
    }
    // Login
    submit2() {
        const Params = {
            Mail: this.state.Mail2,
            Password: this.state.Password2
        }

        axios.post('http://localhost:80/Server/Auth/login.php', qs.stringify(Params), { withCredentials: true }).then(res => {
            res = res.data;
            if (res.code !== 0) {
                //handle error
                alert(res.message)
            } else {
                //handle success
                this.setState({ isLogged: true, id: res.id });
            }
        });
        this.toggle2();
    }
    render() {
        return (
            <div className="App" >
                <Router>
                    <div>
                        <div className="Header ">
                            <Navbar color="light" light expand="md" >
                                <Link to="/">
                                    <NavbarBrand className="col-md-8" href="/"> <img src={logoUcaribe} width="200" className="Ucaribe-logo" alt="logo" />
                                        <h4 className="text-left">OQUEDAD</h4>
                                    </NavbarBrand>
                                </Link>

                                {this.state.isLogged ? (<div><Link to="/dashboard">Panel de usuario</Link> <Button color="danger" onClick={this.logout}>Cerrar Sesión</Button></div>) : <Row>
                                    <div>
                                        <Col>
                                            <Button color="info" onClick={this.toggle1}>Registrarse</Button>
                                        </Col>

                                        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
                                            <ModalHeader toggle={this.toggle1}>Registrarse</ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label>Nombre(s): </Label>
                                                        <Input value={this.state.Name} onChange={this.Handler} type="text" name="Name"></Input>
                                                        <Label>Apellidos: </Label>
                                                        <Input value={this.state.LastName} onChange={this.Handler} type="text" name="LastName"></Input>
                                                        <Label>Correo: </Label>
                                                        <Input value={this.state.Mail1} onChange={this.Handler} type="email" name="Mail1"></Input>
                                                        <Label>Contraseña: </Label>
                                                        <Input value={this.state.Password1} onChange={this.Handler} type="password" name="Password1"></Input>

                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.submit1}>Registrarse</Button>
                                                <Button color="secondary" onClick={this.toggle1}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <div>
                                        <Col>
                                            <Button color="success" onClick={this.toggle2}>Iniciar Sesión</Button>
                                        </Col>
                                        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
                                            <Form>
                                                <ModalHeader toggle={this.toggle2}>Iniciar Sesión</ModalHeader>
                                                <ModalBody>
                                                    <FormGroup>
                                                        <Label>Correo electrónico:</Label>
                                                        <Input onChange={this.Handler} value={this.state.Mail2} type="email" name="Mail2" placeholder="Correo Electrónico"></Input>
                                                        <Label>Contraseña:</Label>
                                                        <Input onChange={this.Handler} value={this.state.Password2} type="password" name="Password2" placeholder="Contraseña"></Input>
                                                    </FormGroup>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.submit2}>Iniciar Sesión</Button>
                                                    <Button color="secondary" onClick={this.toggle2}>Cancelar</Button>
                                                </ModalFooter>
                                            </Form>
                                        </Modal>
                                    </div>
                                </Row>
                                }

                            </Navbar >
                        </div>

                        <Route exact path="/" component={Home} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/AddProject" component={AddProject} />
                        <Route exact path="/EditProject" component={EditProject} />
                        <Route exact path="/RemoveProject" component={RemoveProject} />
                        {!this.state.isLogged ? <Redirect push to="/" /> : ""}
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;