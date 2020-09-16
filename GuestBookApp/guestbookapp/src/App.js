import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/navbar/navbar'
import SignUp from './components/signUp/signUp'
import Login from './components/login/logIn'
import Landing from './components/home/landing'
import GuestBook from './components/guestBook/Guestbook'
import Footer from './components/footer/footer'
import EditMessage from './components/guestBook/editMessage'
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/Guestbook" component={GuestBook} />
      <Route  path="/editMessage" component={EditMessage} />
      <Footer />
    </Router>
  </div>
  );
}

export default App;
