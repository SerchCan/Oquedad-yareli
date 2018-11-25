import React, { Component } from 'react';
import Cardboard from "../../Home/content/Find/Projects/cardboard";
import Axios from 'axios';
import { Col, Row } from "reactstrap";
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
                <Row>
                    {this.state.data.length > 0 ? this.state.data.map((item, i) => {
                        return <Col key={item.ID_P} xs="4"><Cardboard Id={item.ID_P} Img={item.Image} Title={item.Title} Description={item.Description}></Cardboard></Col>
                    }) : "No hay ningún proyecto del que formes parte."}
                </Row>
            </div>
        );
    }
}

export default userAdviser;