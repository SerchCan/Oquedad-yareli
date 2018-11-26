import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import addImg from './images/addproject.png'
import editImg from './images/editproject.png'
import removeImg from './images/removeproject.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, CardImg, CardBody, CardTitle, Row } from 'reactstrap';

class adminPanel extends Component {
    render() {
        return (
            <Container>
                <Row>

                    <Col xs="4">
                        <Link to="/AddProject">
                            <Card>
                                <CardImg top width="100%" src={addImg}></CardImg>
                                <CardBody>
                                    <CardTitle>Añadir proyecto</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs="4">
                        <Link to="/EditProject">
                            <Card>
                                <CardImg top width="100%" src={editImg}></CardImg>
                                <CardBody>
                                    <CardTitle>Editar proyecto</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs="4">
                        <Link to="/RemoveProject">
                            <Card>
                                <CardImg top width="100%" src={removeImg}></CardImg>
                                <CardBody>
                                    <CardTitle>Eliminar proyecto</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default adminPanel;