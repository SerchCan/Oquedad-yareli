import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input, FormGroup, Col, Label } from 'reactstrap';


class Register extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            Name: '',
            LastName: '',
            Mail: '',
            Password: ''
        }
        this.toggle = this.toggle.bind(this);
        this.Handler = this.Handler.bind(this);
    }
    toggle() {
        this.setState({ modal: !this.state.modal })
    }
    Handler(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Col>
                    <Button color="info" onClick={this.toggle}>Registrarse</Button>
                </Col>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Registrarse</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nombre(s): </Label>
                                <Input value={this.state.Name} onChange={this.Handler} type="text" name="Name"></Input>
                                <Label>Apellidos: </Label>
                                <Input value={this.state.LastName} onChange={this.Handler} type="text" name="LastName"></Input>
                                <Label>Correo: </Label>
                                <Input value={this.state.Mail} onChange={this.Handler} type="email" name="Mail"></Input>
                                <Label>Contraseña: </Label>
                                <Input value={this.state.Password} onChange={this.Handler} type="password" name="Password"></Input>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Registrarse</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

export default Register;
