import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Input, Form } from 'reactstrap';
import axios from 'axios'
import Cardboard from './Projects/cardboard'
import qs from 'qs';

class Find extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            data: [],
            text: "Últimos proyectos"
        }
        this.HandleChange = this.HandleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //last projects
        axios.post("http://localhost:80/default.php").then(res => {
            this.setState({ data: res.data })
        }).catch(error => {
            alert(error)
        });
    }

    HandleChange(e) {
        this.setState({ search: e.target.value })
    }
    handleSubmit(event) {
        //search

        const params = {
            Project: this.state.search
        }
        axios.post("http://localhost:80/default.php",
            qs.stringify(params)
        ).then(res => {
            if (this.state.search != "") {
                this.setState({
                    data: res.data, text: "El resultado de tu búsqueda '" + this.state.search + "' es:"
                })
            }
            else {
                this.setState({ data: res.data, text: "Últimos proyectos" })
            }
        }).catch(error => {
            alert(error)
        });
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs="10">
                                <Input type="text" name="Project" onChange={this.HandleChange} placeholder="Buscar..." />
                            </Col>
                            <Col xs="2">
                                <Button color="primary"><span role="img" aria-label="Buscar">🔎</span></Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Container>
                    <h2>{this.state.text}</h2>
                    <Row>
                        {
                            this.state.data.map((item, i) => {
                                return <Col key={item.ID_P} xs="4"><Cardboard Img={item.Image} Title={item.Title} Description={item.Description}></Cardboard></Col>
                            })
                        }
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default Find;
