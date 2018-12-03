import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Row, Col, Button, Input, Form, CardGroup, Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
} from 'reactstrap';
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
                    <CardGroup>


                        {
                            this.state.data.length > 0 ? this.state.data.map((item, i) => {
                                return <Col xs="12" sm="12" md="6" lg="4"><Card key={i}>
                                    <CardImg top height="256" src={"http://localhost:80/Server/Images/" + item.Image} />
                                    <CardBody style={{ backgroundColor: '#333', color: '#fff' }}>
                                        <CardTitle>{item.Title}</CardTitle>
                                        <CardText>{item.Description}</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <Row>
                                            <small>Id del proyecto #{item.ID_P}</small>
                                        </Row>
                                        <Row>
                                            <small>

                                                <a href={"http://localhost:80/Server/Files/" + item.File} download="">
                                                    <img alt='' src="http://localhost:80/Server/Images/PDFFlatIcon.png" width="32"></img>
                                                </a>
                                                Descarga el PDF del proyecto.
                                        </small>
                                        </Row>
                                    </CardFooter>
                                </Card>
                                </Col>
                            }) : this.state.search == '' ? "No hay ningún proyecto nuevo" : "No hay ningún proyecto relacionado a tú busqueda."
                        }
                    </CardGroup>
                </Container>
            </Container>
        );
    }
}

export default Find;
