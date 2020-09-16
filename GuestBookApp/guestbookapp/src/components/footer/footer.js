import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import './footer.css'
export default class Footer extends Component {
    render() {
        return (

            <footer class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6 style={{color:"white"}}>About</h6>
                            <p className="text-justify" style={{color:"white"}}><i>Welcome to our GuestBook</i> </p>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}