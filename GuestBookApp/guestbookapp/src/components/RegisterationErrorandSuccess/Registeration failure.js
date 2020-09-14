import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
class RegesterationFailure extends Component {
    render(){
        console.log(this.props.error)
        return (
        <div className="alert alert-danger" role="alert">
           <div>{this.props.error.firstName}</div>
           <div>{this.props.error.lastName}</div>
           <div>{this.props.error.email}</div>
           <div>{this.props.error.password}</div>
           <div>{this.props.error.confirmPassword}</div>
        </div>
        )
    }
}export default RegesterationFailure;