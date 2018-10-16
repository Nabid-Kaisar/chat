import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import PublicChat from "./PublicChat";
import "./SideBarStyle.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SideBar extends Component {
  constructor(props){
    super(props);

    this.state ={
      currentUserName2: ""
    }
  }

  componentDidUpdate(){
    fetch("http://localhost:5000/secret", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        // console.log("json response: ", resJson);
        // console.log(resJson.success);
        //console.log(resJson.data);
        if (resJson.success === true) {
          //console.log(resJson.name.username);
          this.setState({ currentUserName2: resJson.name.username });
          //this.forceUpdate();

        } else {
          //console.log("error");
          this.setState({currentUserName2: ""});
          //this.forceUpdate();
        }
      })
      .catch(err => {
        this.setState({currentUserName2: ""});
        console.log(err);
      });
  }

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
          <h3 className="linkText">Welcome {this.state.currentUserName2}</h3>
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
