import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import addImg from './images/addproject.png'


import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, CardImg, CardBody, CardTitle } from 'reactstrap';

class adminPanel extends Component {
    render() {
        return (
            <Container>

                <Link to="/AddProject">
                    <Col xs="4">
                        <Card>
                            <CardImg top width="100%" src={addImg}></CardImg>
                            <CardBody>
                                <CardTitle>Añadir proyecto</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Link>

            </Container>
        );
    }
}

export default adminPanel;