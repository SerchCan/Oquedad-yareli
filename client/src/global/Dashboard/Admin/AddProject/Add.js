import React, { Component } from 'react';

import { Container, Input, Form, Button, Label, FormGroup, Badge, Col, Row } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
class AddForm extends Component {
    constructor() {
        super();
        this.state = {
            Title: '',
            Description: '',
            Image: null,
            File: null,
            Adviser: null,
            Major: null,
            Period: null,
            Integrant: '',
            Collaborators: [],
            advisers: [],
            majors: [],
            periods: []
        }
        this.FileHandleChange = this.FileHandleChange.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.AddMember = this.AddMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:80/server/projects/add.php").then(res => {
            res = res.data;
            this.setState({ advisers: res.users, majors: res.majors, periods: res.periods });
        })
    }

    submit() {

        var bodyFormData = new FormData();

        bodyFormData.append('image', this.state.Image[0]);
        bodyFormData.append('file', this.state.File[0]);

        axios.post("http://localhost:80/server/projects/upload.php", bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            res = res.data;
            if (res.code !== 201) {
                //success
                const data = {
                    'Title': this.state.Title,
                    'Description': this.state.Description,
                    'Integrants': this.state.Collaborators,
                    'image': res.image,
                    'file': res.file,
                    'Adviser': this.state.Adviser,
                    'Major': this.state.Major,
                    'Period': this.state.Period
                }
                axios.post("http://localhost:80/server/projects/add.php", qs.stringify(data), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(res => {
                    res = res.data;
                    if (res.code === 0) {
                        alert(res.message);
                    } else {
                        alert(res.code + " Mensaje: " + res.message)
                    }
                })
            } else {
                //handle error
                alert(res.message)
            }
        })

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
    FileHandleChange(e) {
        this.setState({ [e.target.name]: e.target.files });
    }
    HandleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        //$_POST["Adviser"],$_POST["Major"],$_POST["Period"])) {
        return (
            <Container>
                <Form encType="multipart/form-data">
                    <FormGroup>
                        <Label>Título del proyecto:</Label>
                        <Input type="text" name="Title" onChange={this.HandleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción del proyecto:</Label>
                        <Input type="text" name="Description" onChange={this.HandleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Archivo PDF del archivo:</Label>
                        <Input type="file" name="File" onChange={this.FileHandleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Imagen para mostrar:</Label>
                        <Input type="file" name="Image" onChange={this.FileHandleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Asesor del proyecto:</Label>
                        <Input type="select" name="Adviser" onChange={this.HandleChange} >
                            <option></option>
                            {this.state.advisers.map((elem, i) => {
                                return <option key={i} value={elem.ID_U}>{elem.Name + ' ' + elem.LastName}</option>
                            })}
                        </Input>

                    </FormGroup>
                    <FormGroup>
                        <Label>Carrera:</Label>
                        <Input type="select" name="Major" onChange={this.HandleChange} >
                            <option></option>
                            {this.state.majors.map((elem, i) => {
                                return <option key={i} value={elem.ID_M}>{elem.Major}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Periodo de realización:</Label>
                        <Input type="select" name="Period" onChange={this.HandleChange} >
                            <option></option>
                            {this.state.periods.map((elem, i) => {
                                return <option key={i} value={elem.ID_PER}>{elem.Period + ' ' + elem.Year}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Integrantes del proyecto:</Label>
                        <Row>
                            <Col xs="10">
                                <Input name="Integrant" value={this.state.Integrant} onChange={this.HandleChange} />
                            </Col>
                            <Col xs="2">
                                <Button color="info" onClick={this.AddMember}>Añadir integrante</Button>
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
                    <Button color="success" onClick={this.submit}>Añadir Proyecto</Button>
                </Form>
            </Container>
        );
    }
}

export default AddForm;