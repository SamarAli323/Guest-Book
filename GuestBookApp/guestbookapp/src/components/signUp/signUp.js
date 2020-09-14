import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../../service/authenticationServices'
import RegisterationSuccess from '../RegisterationErrorandSuccess/RegisterationSuccess'
import Registerationfailure from '../RegisterationErrorandSuccess/Registeration failure'
import './signUp.css'

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      button: ''
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser)
    const response = await AuthService.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.password2);
    console.log(response.data.error);
    this.setState({ errors: response.data.error })
    console.log(this.state.errors)
    if (response.data.error) {
      this.setState({ button: <Registerationfailure error={this.state.errors} /> })
    } else if (response.data) {
      this.setState({ button: <RegisterationSuccess/> })
      this.setState({ button: <Redirect to="/login"/> })
    } else { this.setState({ button: '' }) }
  };
  render() {
    return (
      <div className="card bg-light" style={{ marginTop:"30px",marginRight:"auto",marginLeft:"auto",width:"400px",maxHeight:"635px"}}>
        <article className="card-body mx-auto" style={{maxWidth:"400px"}}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <p className="text-center">Get started with your free account</p>
          {this.state.button}
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input id="firstName" name="" className="form-control" placeholder="First Name" type="text" onChange={this.onChange} value={this.state.firstName}></input>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i class="fa fa-user"></i> </span>
              </div>
              <input id="lastName" name="" className="form-control" placeholder="last Name" type="text" onChange={this.onChange} value={this.state.lastName}></input>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
              </div>
              <input id="email" name="" className="form-control" placeholder="Email address" type="email" onChange={this.onChange} value={this.state.email}></input>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i class="fa fa-lock"></i> </span>
              </div>
              <input id="password" className="form-control" placeholder="Create password" type="password" onChange={this.onChange} value={this.state.password}></input>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i class="fa fa-lock"></i> </span>
              </div>
              <input id="password2" className="form-control" placeholder="Confirm password" type="password" onChange={this.onChange} value={this.state.password2}></input>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
            </div>
            <p className="text-center"><a ><Link to="/login">Have an account?</Link></a> </p>
          </form>
        </article>
      </div>
    );
  }
} export default SignUp;