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
      password: "",
      ifWrong: ""
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
      .then( response => {
        //console.log("json response: ", response);
        return response.json();
      })
      .then( resJson => {
         console.log(resJson);
         console.log(resJson.success);
        if(resJson.success === true){
          console.log("yes i am true")
             this.setState({ifWrong: "Login Successful"})
        }if(resJson.success === false){
          console.log("no i am false")
           this.setState({ifWrong: "Wrong Username / Password"})
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
        <input type="text" name="username" onChange={this.handleUsername} className="input-box-area"/>

        <h4 className="promptText">Password:</h4>

        <input type="password" name="password" onChange={this.handlePassword} className="input-box-area"/>

        <button onClick={this.handleLogin} className = "loginButton">Login</button>
        <h4>{this.state.ifWrong}</h4>
      </div>
    );
  }
}

export default Login;
