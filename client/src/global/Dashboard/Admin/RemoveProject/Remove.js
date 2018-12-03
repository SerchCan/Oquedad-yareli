import React, { Component } from 'react';
import { Container, FormGroup, Form, Input, Row, Col, Button, Label } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
class RemoveForm extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            Title: '',
            Description: '',
            disable: true,
            Valid: false
        }
        this.FillData = this.FillData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Submit = this.Submit.bind(this);
    }
    FillData() {
        axios.get("http://localhost:80/server/projects/delete.php?Id=" + this.state.id).then(res => {
            res = res.data;
            console.log(res)
            if (res !== false) {
                this.setState({
                    id: res.ID_P,
                    Title: res.Title,
                    Description: res.Description,
                    Valid: true
                });
            } else {
                this.setState({ Valid: false });
                alert("El id del proyecto no existe");
            }
        })
    }
    Submit() {
        const params = {
            Id: this.state.id
        }
        if (this.state.Valid) {
            axios.post("http://localhost:80/Server/Projects/delete.php", qs.stringify(params)).then(res => {
                console.log(res);
                res = res.data;
                if (res.code == 0) {
                    alert("Eliminado Correctamente");
                }
            })
        } else {
            alert("Probablemente el proyecto no exista");
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label>Id del proyecto:</Label>
                        <Row>
                            <Col xs="10">
                                <Input type="text" name="id" value={this.state.id} onChange={this.handleChange}></Input>
                            </Col>
                            <Col xs="2">
                                <Button color="info" onClick={this.FillData}>Encontrar proyecto</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Label>Información del proyecto a borrar:</Label>
                    <FormGroup>
                        <Label>Titulo del proyecto:</Label>
                        <Input value={this.state.Title} disabled={this.state.disable}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción del proyecto:</Label>
                        <Input value={this.state.Description} disabled={this.state.disable}></Input>
                    </FormGroup>
                    <Button color="danger" onClick={this.Submit}>Eliminar proyecto</Button>
                </Form>
            </Container>
        );

    }
}
export default RemoveForm;
