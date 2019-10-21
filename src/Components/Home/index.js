import React from 'react';
import {
    Col, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HomePageImage from "../../Utils/img/homepage.jpg";
import './Home.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{backgroundImage: `url(${HomePageImage})`, height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <Col className="text-center" style={{height: '100%'}}>
                    <Link to="/menu">
                        <Button variant="primary" className="btn menubtn" >
                            Menu
                        </Button>
                    </Link>
                </Col>
            </div>
        )
    }
};