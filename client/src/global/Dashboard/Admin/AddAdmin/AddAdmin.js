import React, { Component } from 'react';

import { Container, Form, FormGroup, Row, Col, Button, Label, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
class addAdminForm extends Component {
    constructor() {
        super();
        this.state = {
            Id: 0,
            Name: '',
            LastName: '',
            Mail: '',
            find: false
        }
        this.find = this.find.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    find() {
        axios.get("http://localhost/Server/Admins/Add.php?Mail=" + this.state.Mail).then(res => {
            res = res.data;
            if (res != false) {
                this.setState({
                    Id: res.ID_U,
                    Name: res.Name,
                    LastName: res.LastName,
                    Mail: res.Mail,
                    find: true
                });
            } else {
                this.setState({
                    Id: 0,
                    Name: '',
                    LastName: '',
                    Mail: '',
                    find: false
                })
                alert("Usuario no encontrado")
            }
        })
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    submit() {
        if (this.state.find) {
            const params = {
                Id: this.state.Id
            }
            axios.post("http://localhost/Server/Admins/Add.php", qs.stringify(params)).then(res => {
                res = res.data;
                if (res.code == 0) {
                    alert("Administrador correctamente asignado.")
                }
                else {
                    alert("Error #" + res.code + ":" + res.message);
                }
            })
        } else {
            alert("Probablemente el usuario no exista");
        }
    }
    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label>Correo o matrícula</Label>
                        <Row>
                            <Col xs="10">
                                <Input type="text" name="Mail" value={this.state.Mail} onChange={this.handleChange}></Input>
                            </Col>
                            <Col xs="2">
                                <Button color="info" onClick={this.find}>Buscar:</Button>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Label>Nombre:</Label>
                        <Input type="text" value={this.state.Name + ' ' + this.state.LastName} disabled></Input>
                    </FormGroup>
                    <Button color="success" onClick={this.submit}>Conceder permiso de administrador</Button>
                </Form>
            </Container>
        );
    }
}
export default addAdminForm;