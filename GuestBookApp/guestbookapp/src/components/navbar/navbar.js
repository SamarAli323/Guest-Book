import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Guest Book</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="navbar-text">
                        <Link to="/">Home</Link>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <Link to="/login">login</Link>
                        <Link to="/signup" style={{marginLeft:"10px"}}>signup</Link>
                    </span>
                </div>
            </nav>
        );
    }
} export default Navbar;