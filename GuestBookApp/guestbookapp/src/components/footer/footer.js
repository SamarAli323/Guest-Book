import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import './footer.css'
export default class Footer extends Component {
    render() {
        return (

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify" style={{color:"w"}}><i>Welcome to our GuestBook</i> </p>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}