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
      <div className="wrapper fadeInDown">
      <div id="formContent">
        {this.state.button}
        <div className="fadeIn first">
          <img className="rounded-circle" width="0" src="https://www.nextpng.com/en/transparent-png-ryvvq" id="icon" alt="User Icon" />
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <input type="text" id="firstName" className="fadeIn second" name="signup" placeholder="first Name" onChange={this.onChange} value={this.state.firstName}></input>
          <input type="text" id="lastName" className="fadeIn second" name="signup" placeholder="last Name" onChange={this.onChange} value={this.state.lastName}></input>
          <input type="text" id="email" className="fadeIn second" name="signup" placeholder="email" onChange={this.onChange} value={this.state.email}></input>
          <input type="password" id="password" className="fadeIn third" name="signup" placeholder="password" onChange={this.onChange} value={this.state.password}></input>
          <input type="password" id="password2" className="fadeIn third" name="signup" placeholder="confirm password" onChange={this.onChange} value={this.state.password2}></input>
          <input type="submit" className="fadeIn fourth" value="Sign up"></input>
        </form>
        <div id="formFooter">
          <a className="underlineHover"><Link to="/login">have an account?</Link></a>
        </div>
      </div>
    </div>
    );
  }
} export default SignUp;