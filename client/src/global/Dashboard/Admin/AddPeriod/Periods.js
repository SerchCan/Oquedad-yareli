import React, { Component } from 'react';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader, Button, FormGroup, Form, Label, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
class PeriodForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: '',
            year: '',
            Modal: false
        }
        this.Toggle = this.Toggle.bind(this);
        this.submit = this.submit.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }
    HandleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    submit() {
        const params = {
            period: this.state.period,
            year: this.state.year
        }
        axios.post("http://localhost:80/Server/Periods/Add.php", qs.stringify(params)).then(res => {
            console.log(res);

            res = res.data;
            console.log(res);
            if (res.code === 0) {
                alert("Añadido correctamente");
                this.props.update();
            }
            else {
                alert("Error code: " + res.code + "\n Mensaje:" + res.message);
            }
        })


    }
    Toggle() {
        this.setState({ Modal: !this.state.Modal });
    }
    render() {
        return (
            <Container>
                <Button color="info" onClick={this.Toggle}>Añadir periodo</Button>
                <Modal isOpen={this.state.Modal} toggle={this.Toggle}>
                    <ModalHeader toggle={this.Toggle}>Añadir periodo</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Periodo: </Label>
                                <Input value={this.state.period} type="select" name="period" onChange={this.HandleChange}>
                                    <option></option>
                                    <option value="Primavera">Primavera</option>
                                    <option value="Verano">Verano</option>
                                    <option value="Otoño">Otoño</option>
                                    <option value="Invierno">Invierno</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Año: </Label>
                                <Input value={this.state.year} type="number" name="year" onChange={this.HandleChange}></Input>
                            </FormGroup>
                        </Form>
                        Here is the form....
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.submit}>Añadir</Button>
                        <Button color="danger" onClick={this.Toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default PeriodForm;