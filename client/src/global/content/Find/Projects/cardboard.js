import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


class Cardboard extends Component {
    render() {
        return (
            <div>

                <Card>
                    <CardImg top width="100%" src={this.props.Img} />
                    <CardBody>
                        <CardTitle>{this.props.Title}</CardTitle>
                        <CardSubtitle>{this.props.Description}</CardSubtitle>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default Cardboard;
