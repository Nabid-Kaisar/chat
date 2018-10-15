import React, { Component } from "react";
import './LoginStyle.css'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.handleUsername = this.handleUsername.bind(this);

    this.handlePassword = this.handlePassword.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    fetch("http://localhost:5000/postLoginInfo", {

      headers: { "Content-Type": "application/json", 'Accept':  'application/json','Cache': 'no-cache' },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      method: "POST"
    })
      .then(response => {
        //console.log("json response: ", response);
        return response.text();
      })
      .then(resJson => {
        console.log("json response: ", resJson);
        if(resJson.success == true){

        }
      })
      .catch(err => {
        console.log(err);
      });



  }

  render() {
    return (
      <div className="loginContainer">
        <h4 className="propmtLogin"><span className= "dotGreen"> </span> Login to Chat now :</h4>
        <h4 className="promptText">Username:</h4>
        <input type="text" name="username" onChange={this.handleUsername} />

        <h4 className="promptText">Password:</h4>

        <input type="text" name="password" onChange={this.handlePassword} />

        <button onClick={this.handleLogin} className = "loginButton">Login</button>
      </div>
    );
  }
}

export default Login;
