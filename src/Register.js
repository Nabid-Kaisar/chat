import React, { Component } from "react";
import "./RegisterStyle.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      regOkMsg: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleRegister() {
    var x = this.state.username;
    var y = this.state.email;
    var x1 = x.replace(/\s/g, "");
    console.log(x1.length);
    var y1 = y.replace(/\s/g, "");
    console.log(y1.length);

    if (x1.length === 0 || y1.length === 0)//checking if someone entered empty string containing spaces
    {
       this.setState({
        regOkMsg:
          "Please fill up all the input box to complete registration process"
      });
    } else {
      fetch("http://localhost:5000/postRegisterInfo", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }),
        method: "POST"
      })
        .then(response => {
          return response.json();
        })
        .then(resJson => {
          console.log(resJson);
          if (resJson.success === "ok") {
            this.setState({
              regOkMsg:
                "New User Registered. Please login now to chat with your username and password."
            });
          } else if (resJson.success === "swr") {
            this.setState({
              regOkMsg: "Something went wrong. Please try again later."
            });
          } else if (resJson.success === "ae") {
            this.setState({
              regOkMsg:
                "Username already Exist. Please try with different username."
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <div className="regContainer">
          <h4 className="promptTextReg">
            <span className="dotGreen"> </span> Register to join our community :
          </h4>
          <h4 className="promptText">Username:</h4>
          <input
            type="text"
            name="username"
            onChange={this.handleUsername}
            className="input-box-area"
          />

          <h4 className="promptText">Valid Email Address:</h4>
          <input
            type="text"
            name="email"
            onChange={this.handleEmail}
            className="input-box-area"
          />
          <h4 className="promptText">Password:</h4>
          <input
            type="password"
            name="password"
            onChange={this.handlePassword}
            className="input-box-area"
          />
          <button onClick={this.handleRegister} className="regButton">
            Register
          </button>
          <h4 className="promptText">{this.state.regOkMsg}</h4>
        </div>
      </div>
    );
  }
}

export default Register;
