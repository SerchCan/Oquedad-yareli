import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Input, Form } from 'reactstrap';
import axios from 'axios'
import Cardboard from './Projects/cardboard'


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
        axios.get("http://localhost:80/default.php").then(res => {
            this.setState({ data: res.data })
        }).catch(error => {
            alert(error)
        });
    }

    HandleChange(e) {
        this.setState({ search: e.target.value })
    }
    handleSubmit(event) {
        if (this.state.search !== "") {
            axios.get("http://localhost:80/Server/Projects/search.php?Project=" + this.state.search,
            ).then(res => {
                console.log(res);
                this.setState({
                    data: res.data, text: "El resultado de tu búsqueda '" + this.state.search + "' es:"
                })
            }).catch(error => {
                alert(error)
            });
            event.preventDefault();
        } else {
            axios.get("http://localhost:80/default.php").then(res => {
                this.setState({ data: res.data })
            }).catch(error => {
                alert(error)
            });
        }
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
                            this.state.data.length > 0 ? this.state.data.map((item, i) => {
                                return <Col key={item.ID_P} xs="4"><Cardboard Id={item.ID_P} Img={"http://localhost:80/Server/Images/" + item.Image} Title={item.Title} Description={item.Description} PDF={item.File}></Cardboard></Col>
                            }) : this.state.search == '' ? "No hay ningún proyecto nuevo" : "No hay ningún proyecto relacionado a tú busqueda."
                        }
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default Find;
