import React, { Component } from "react";
import './LoginStyle.css'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.inputNameHandler = this.inputNameHandler.bind(this);
    this.inputPassHandler = this.inputPassHandler.bind(this);

    this.state = {
      username: "",
      password: "",
      ifWrong: ""
    };
  }

  inputNameHandler(e){
    this.setState({ username: e.target.value });
    if (e.keyCode === 13 ){
      this.handleLogin();
    }

  }
  inputPassHandler(e){
    this.setState({ password: e.target.value });
    if (e.keyCode === 13 ){
      this.handleLogin();
    }
  }

   handleLogin() { //this method produces error on line 40. "sometimes"
     fetch("http://localhost:5000/postLoginInfo", {

      headers: { "Content-Type": "application/json", 'Accept': 'application/json','Cache': 'no-cache' },
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
        <input type="text" name="username" onKeyUp={this.inputNameHandler}  className="input-box-area"/>

        <h4 className="promptText">Password:</h4>

        <input type="password" name="password" onKeyUp={this.inputPassHandler} className="input-box-area"/>

        <button onClick={this.handleLogin} className = "loginButton">Login</button>
        <h4>{this.state.ifWrong}</h4>
      </div>
    );
  }
}

export default Login;
