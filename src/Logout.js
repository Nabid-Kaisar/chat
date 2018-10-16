import React, { Component } from "react";
import './LogoutStyle.css'
class Logout extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);

    this.state ={
      logoutMsg:""
    }
  }

  handleLogout(){
    fetch("http://localhost:5000/logout", {

      headers: { "Content-Type": "application/json", 'Accept':  'application/json','Cache': 'no-cache' },
      credentials: 'include',


    })
      .then(response => {
        console.log("json response: ", response);
        return response.json();
      })
      .then(resJson => {
        {
          if(resJson.success == true){
            this.setState({
              logoutMsg: "You have been logged out."
            })
          }else{
            this.setState({
              logoutMsg: "Something went wrong. please try again later"
            })
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
      <div className ="logOutContainer">
      <h4 className="propmtLogin"><span className= "dotRedlogOut"> </span> Click to Logout :</h4>
      <button onClick={this.handleLogout} className = "logoutButton">Logout</button>
      <h4 className="logOutMsg">{this.state.logoutMsg}</h4>
      </div>
    )
  }

}
export default Logout;
