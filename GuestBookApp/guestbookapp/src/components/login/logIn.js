import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../../service/authenticationServices'
import Registerationfailure from '../RegisterationErrorandSuccess/Registeration failure'
import './login.css'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      button: ''
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    const user = await AuthService.login(this.state.email, this.state.password)
    console.log(user);
    this.setState({ errors: user.error })
    console.log(this.state.errors)
    if (user.error) {
      this.setState({ button: <Registerationfailure error={this.state.errors} /> })
    } else if (user) {
      this.setState({ button: <Redirect to='/Guestbook' /> })
    } else { this.setState({ button: '' }) }
  }; render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {this.state.button}
          <div className="fadeIn first">
            <img className="rounded-circle" width="0" src="https://www.nextpng.com/en/transparent-png-ryvvq" id="icon" alt="User Icon" />
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <input type="text" id="email" className="fadeIn second" name="login" placeholder="login" onChange={this.onChange} value={this.state.email}></input>
            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={this.onChange} value={this.state.password}></input>
            <input type="submit" className="fadeIn fourth" value="Log In"></input>
          </form>
          <div id="formFooter">
            <a className="underlineHover"><Link to="/signup">Don't have an account?</Link></a>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;