import React, { Component } from 'react';
import { Container, FormGroup, Form, Label, Input, Badge, Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
class EditForm extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            Title: '',
            Description: '',
            Integrant: '',
            Collaborators: [],
            disable: true
        }
        this.FillData = this.FillData.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.AddMember = this.AddMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }
    HandleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    FillData() {
        axios.get("http://localhost:80/server/projects/edit.php?Id=" + this.state.id).then(res => {
            res = res.data;
            console.log(res)
            if (res.project !== false) {
                this.setState({
                    Title: res.project.Title,
                    Description: res.project.Description,
                    Collaborators: this.state.Collaborators.concat(res.members),
                    disable: false
                });
            } else {
                alert("El id del proyecto no existe");
            }
        })
    }
    submit() {
        if (this.state.id != null && this.state.id != '') {
            const data = {
                Id: this.state.id,
                Title: this.state.Title,
                Description: this.state.Description,
                Integrants: this.state.Collaborators
            }
            axios.post("http://localhost:80/server/projects/edit.php", qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
                res = res.data;
                if (res.code === 0) {
                    alert(res.message);
                } else {
                    alert(res.code + " Mensaje: " + res.message)
                }
            })
        }
        else {
            alert("No ha seleccionado un proyecto");
        }
    }
    AddMember() {

        axios.get("http://localhost/Server/Dashboard/FindCollaborator.php?Mail=" + this.state.Integrant).then(res => {
            console.log("RESPONSE DATA", res.data)
            res = res.data;
            if (res === false) {
                alert("Usuario no registrado o Usuario no es un estudiante.");
            }
            else {
                this.setState({ Collaborators: [...this.state.Collaborators, res] });
            }

        })
    }
    removeMember(e) {
        var actual = [...this.state.Collaborators];
        actual.splice(e.target.value, 1)
        this.setState({ Collaborators: [...actual] });
    }
    render() {
        return (
            <Container>
                <Form encType="multipart/form-data">
                    <FormGroup>
                        <Label>Id del proyecto:</Label>
                        <Row>
                            <Col xs="10">
                                <Input type="text" name="id" onChange={this.HandleChange} />
                            </Col>
                            <Col xs="2">
                                <Button color="info" onClick={this.FillData}>Buscar proyecto</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label>Título del proyecto:</Label>
                        <Input type="text" value={this.state.Title} name="Title" onChange={this.HandleChange} disabled={this.state.disable} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción del proyecto:</Label>
                        <Input type="text" value={this.state.Description} name="Description" onChange={this.HandleChange} disabled={this.state.disable} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Integrantes del proyecto:</Label>
                        <Row>
                            <Col xs="10">
                                <Input name="Integrant" value={this.state.Integrant} onChange={this.HandleChange} disabled={this.state.disable} />
                            </Col>
                            <Col xs="2">
                                <Button color="info" onClick={this.AddMember}>Añadir Integrante</Button>
                            </Col>
                        </Row>
                        <Container>
                            <h3>Integrantes:</h3>
                            {this.state.Collaborators.length > 0 ? this.state.Collaborators.map((elem, i) => {
                                return <Badge color="dark" pill key={i}>
                                    <Col>
                                        {elem.Name + ' ' + elem.LastName}
                                        <Button value={i} onClick={this.removeMember} close />
                                    </Col>
                                </Badge>
                            }) : ''}
                        </Container>
                    </FormGroup>
                    <Button color="warning" onClick={this.submit}>Actualizar proyecto</Button>
                </Form>
            </Container>
        );
    }
}

export default EditForm;