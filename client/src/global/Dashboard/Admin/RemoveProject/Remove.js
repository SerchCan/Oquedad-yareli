import React, { Component } from 'react';
import { Container } from 'reactstrap';
import underconstr from '../images/underconstruction.gif'
class RemoveForm extends Component {
    render() {
        return (
            <Container>
                <img src={underconstr} alt=''></img>
            </Container>
        );

    }
}
export default RemoveForm;
