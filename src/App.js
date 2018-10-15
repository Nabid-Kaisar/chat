import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import PublicChat from "./PublicChat";
import TitleBar from "./TitleBar.js"
import SideBar from "./SideBar.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <TitleBar />
            <SideBar />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
