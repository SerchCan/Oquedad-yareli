import React, { Component } from 'react';
import Axios from 'axios';
import { CardGroup, Col, Row, Card, CardImg, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
class userAdviser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLogged: false,
            id: 0,
            type: 0
        }
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        Axios.get("http://localhost:80/Server/Auth/check.php", { withCredentials: true }).then(res => {
            res = res.data;
            if (res.code !== 200) {
                //handle error
                this.setState({ isLogged: false });
            }
            else {
                this.setState({ isLogged: true, id: res.data.id, type: res.data.type });
            }

        })
        Axios.get("http://localhost:80/Server/Dashboard/dashboard.php", { withCredentials: true }).then(res => {
            res = res.data;
            if (res.length > 0) {
                this.setState({ data: res });
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div className="projects" >
                <h3>{this.state.type !== "1" ? "Proyectos que asesoraste:" : "Projectos del que formas parte:"}</h3>

                <CardGroup>
                    {this.state.data.length > 0 ? this.state.data.map((item, i) => {
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
                        </Card> </Col>

                    }) : "No hay ningún proyecto del que formes parte."}

                </CardGroup>


                {
                    /*
                                    <CardDeck>
                                        {this.state.data.length > 0 ? this.state.data.map((item, i) => {
                                            return <Cardboard key={item.ID_P} Id={item.ID_P} Img={"http://localhost:80/Server/Images/" + item.Image} Title={item.Title} Description={item.Description} PDF={item.File}></Cardboard>
                                        }) : "No hay ningún proyecto del que formes parte."}
                                    </CardDeck>*/
                }

            </div>
        );
    }
}

export default userAdviser;