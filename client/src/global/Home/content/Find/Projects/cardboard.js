import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardFooter, Row } from 'reactstrap';


class Cardboard extends Component {
    render() {
        return (
            <Card>
                <CardImg top width="60%" alt='' src={this.props.Img} />
                <CardBody style={{ backgroundColor: '#333', color: '#fff' }}>
                    <CardTitle>{this.props.Title}</CardTitle>
                    <CardSubtitle>{this.props.Description}</CardSubtitle>
                </CardBody>
                <CardFooter>
                    <Row>
                        <small>Id del proyecto #{this.props.Id}</small>
                    </Row>
                    <Row>
                        <small>

                            <a href={"http://localhost:80/Server/Files/" + this.props.PDF} download="">
                                <img alt='' src="http://localhost:80/Server/Images/PDFFlatIcon.png" width="32"></img>
                            </a>
                            Descarga el PDF del proyecto.
                            </small>
                    </Row>
                </CardFooter>
            </Card>
        );
    }
}

export default Cardboard;
