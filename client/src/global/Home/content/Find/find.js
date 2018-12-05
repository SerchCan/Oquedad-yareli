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
import axios from 'axios';
class Find extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            data: [],
            period: '0',
            periods: [],
            text: "Últimos proyectos",
            id_per: 0
        }
        this.HandleChange = this.HandleChange.bind(this)
        this.HandleChange2 = this.HandleChange2.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //last projects
        axios.get("http://localhost:80/default.php").then(res => {
            this.setState({ data: res.data })
        }).catch(error => {
            alert(error)
        });
        axios.get("http://localhost:80/server/projects/add.php").then(res => {
            res = res.data;
            this.setState({ periods: res.periods });
        })
    }

    HandleChange(e) {
        this.setState({ search: e.target.value })
    }
    HandleChange2(e) {
        this.setState({ period: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        var params;
        var text;
        var finded = true;
        // eslint-disable-next-line
        if (this.state.search != "") {
            // eslint-disable-next-line
            if (this.state.period != '0') {
                params = {
                    Project: this.state.search,
                    Period: this.state.period
                }
                text = "El resultado de tu búsqueda '" + this.state.search + "' en periodo es:"
            }
            else {
                params = {
                    Project: this.state.search,
                }
                text = "El resultado de tu búsqueda '" + this.state.search + "' es:"
            }

        } else {
            // eslint-disable-next-line
            if (this.state.period != '0') {

                params = {
                    Period: this.state.period
                }
                text = "El resultado de tu búsqueda en periodo es:"
            } else {
                finded = false;
            }
        }
        if (finded) {
            axios.get("http://localhost:80/Server/Projects/search2.php", {
                params: params
            }
            ).then(res => {
                console.log(res);
                this.setState({
                    data: res.data, text: text
                })
            }).catch(error => {
                alert(error)
            });
        } else {
            axios.get("http://localhost:80/default.php").then(res => {
                this.setState({
                    data: res.data, text: text
                })
            }).catch(error => {
                alert(error)
            });
        }
    }

    render() {
        return (
            <Container>
                <Container>
                    <Form >
                        <Row>
                            <Col xs="6">
                                <Input type="text" value={this.state.search} onChange={this.HandleChange} placeholder="Palabras clave" />
                            </Col>
                            <Col xs="2">
                                <Input type="select" value={this.state.period} onChange={this.HandleChange2} placeholder="Periodo" >
                                    <option value="0">Periodo</option>
                                    {this.state.periods.map((elem, i) => {
                                        return <option key={i} value={elem.ID_PER}>{elem.Period + ' ' + elem.Year}</option>
                                    })}
                                </Input>
                            </Col>
                            <Col xs="2">
                                <Button type='submit' onClick={this.handleSubmit} color="primary"><span role="img" aria-label="Buscar">🔎</span></Button>
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
                                // eslint-disable-next-line
                            }) : this.state.search == '' ? "No hay ningún proyecto nuevo" : "No hay ningún proyecto relacionado a tú busqueda."
                        }
                    </CardGroup>
                </Container>
            </Container>
        );
    }
}

export default Find;
