import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import PublicChat from "./PublicChat";
import "./SideBarStyle.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar">
        <div className ="linkContainer"> 
          <Link to="/register" className="linkText">Register</Link>
          <br />
          <Link to="/login" className="linkText">Login</Link>
          <br />
          <Link to="/logout" className="linkText">Logout</Link>
          <br />
        </div>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </div>

        <div className="content">
          <Link to="/chat" className="linkTextChat">Chat Now! </Link>
          <br />
          <Route path="/chat" component={PublicChat} />
        </div>
      </div>
    );
  }
}

export default SideBar;
