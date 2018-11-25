import React, { Component } from 'react';
import Axios from 'axios';
import Projectdata from "./Projectsdata/projectdata";
import Admin from './Admin/admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            type: 0,
            isLogged: false
        }
        this._isMounted = false;

    }
    componentDidMount() {
        this._isMounted = true;
        Axios.get("http://localhost:80/Server/Auth/check.php", { withCredentials: true }).then(res => {
            res = res.data;
            if (res.code !== 200) {
                //handle error
                this._isMounted && this.setState({ isLogged: false });
            }
            else {
                this._isMounted && this.setState({ isLogged: true, id: res.data.id, type: res.data.type });
            }

        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <Container>
                <Container>
                    <h2>Panel de administración:</h2>
                    {this._isMounted && this.state.type == 3 ? <Admin /> : ''}

                </Container>

                {this._isMounted && this.state.isLogged ? <Projectdata /> : "Nothing to show"}
            </Container>
        );

    }
}

export default Dashboard;