import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input, FormGroup, Col, Label
} from 'reactstrap';
import Axios from 'axios';
import qs from 'qs';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            Mail: '',
            Password: ''
        }
        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
        this.Handler = this.Handler.bind(this)
    }
    toggle() {
        this.setState({ modal: !this.state.modal })
    }
    Handler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    submit() {
        const Params = {
            Mail: this.state.Mail,
            Password: this.state.Password
        }

        Axios.post('http://localhost:80/Server/Auth/login.php', qs.stringify(Params), { withCredentials: true }, res => {
            alert(res);
        });
    }
    render() {
        return (
            <div>
                <Col>
                    <Button color="success" onClick={this.toggle}>Iniciar Sesión</Button>
                </Col>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Form>
                        <ModalHeader toggle={this.toggle}>Iniciar Sesión</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Correo electrónico:</Label>
                                <Input onChange={this.Handler} value={this.state.Mail} type="email" name="Mail" placeholder="Correo Electrónico"></Input>
                                <Label>Contraseña:</Label>
                                <Input onChange={this.Handler} value={this.state.Password} type="password" name="Password" placeholder="Contraseña"></Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.submit}>Iniciar Sesión</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Login;
