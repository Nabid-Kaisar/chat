import React, { Component } from "react";
import "./App.css";
import "./styleChatApp.css";
import Comp1 from "./messageContainer.js";

class PublicChat extends Component {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.clearInputField = this.clearInputField.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.recentChat = this.recentChat.bind(this);


    this.state = {
      inputArray: [],
      inputText: "",
      currenTime: "",
      loginMsg: "",
      loginStatus: false

    };
  }

  inputHandler(event) {
    this.setState({ inputText: event.target.value });
    this.setState({ currenTime: new Date().toLocaleTimeString() });

    if (event.keyCode == 13 && this.state.inputText !== "") {
      // this.setState({ inputText: event.target.value });
      this.eventHandler();
      this.clearInputField();
    }
  }



  async eventHandler() {

      let person = {
        text: this.state.inputText,
        dateTime: this.state.currenTime
      };

      if (this.state.inputText !== "") {
        //sending network request to save my chat data to db
        fetch("http://localhost:5000/sendmsg", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            chatmsg: this.state.inputText
          }),
          method: "POST"
        })
          .then(response => {
            //console.log("json response: ", response);
            return response.json();
          })
          .then(resJson => {
            console.log("json response: ", resJson);
            if (resJson.success == false) {
              //not logged IN
              this.setState({
                loginMsg:
                  "You are not logged IN. Please login to participate in chat! Thank you"
              });
              this.setState({loginStatus: false})
            }
            // else{
            //   this.setState({loginStatus: true})
            // }
          })
          .catch(err => {
            console.log(err);
          });

        //end of req, ** this is not working **
        console.log("Your logged in status:" + this.state.loginStatus);

        await this.setState({
          inputArray: [...this.state.inputArray, person]
        });
      }
      //console.log("main comp", person);
      this.clearInputField();
      let grabbableId = this.state.inputArray.length - 1;
      let grabbedElement = document.getElementById(grabbableId);

      grabbedElement.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest"
      });

    // else{
    //   this.setState({
    //     loginMsg:
    //       "You are not logged IN. Please login to participate in chat! Thank you"
    //   });
    // }
  }

  //didMount Data fetching helper method
  async recentChat(msg, time) {

      let person = {
        text: msg,
        dateTime: time
      };

        await this.setState({
          inputArray: [...this.state.inputArray, person]
        });

      //console.log("main comp", person);
      this.clearInputField();
      let grabbableId = this.state.inputArray.length - 1;
      let grabbedElement = document.getElementById(grabbableId);

      grabbedElement.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest"
      });

  }

  clearInputField() {
    let inputBox = this.refs.inputBox;
    inputBox.value = "";
    this.setState({ inputText: "" });
  }

  //check if logged in with session or not
  checkStatus() {
    fetch("http://localhost:5000/status")
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        // console.log("json response: ", resJson);
        // console.log(resJson.success);
        //console.log(resJson.data);
        if (resJson.login === true) {
          this.setState({ loginStatus: true });
        }
      })
      .catch(err => {
        console.log(err);
      });

  }

  // componentDidMount() {
  //   fetch("http://localhost:5000/status")
  //     .then(response => {
  //       //console.log(response);
  //       return response.json();
  //     })
  //     .then(resJson => {
  //       // console.log("json response: ", resJson);
  //       // console.log(resJson.success);
  //       //console.log(resJson);
  //       if (resJson.login === true) {
  //         this.setState({ loginStatus: true });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  //filling up array from database
  componentDidMount(){
    fetch("http://localhost:5000/recentchat")
      .then(response => {

        return response.json();
      })
      .then(resJson => {
        // console.log("json response: ", resJson);
        // console.log(resJson.success);
        //console.log(resJson.data);
        if (resJson.success === true) {

          console.log(resJson);
          // this.setState({testVar:resJson.data[0].chatmsg})
          for(var i =9; i >=0; i--){
              this.recentChat(resJson.data[i].chatmsg, resJson.data[i].time)
          }
        } else {
          console.log("error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.inputArray)
    const showMessage = this.state.inputArray.map((item, idx) => {
      return <Comp1 inputValueText={item} idProps={idx} key={idx} />;
    });

    this.checkStatus();

    return (
      <div>
        <div className="chatbox-head-container">
          <div className="chat-container">
            <div className="menu-content">
              <h4>Public Chat</h4>
            </div>
            <div className="message-container">{showMessage}</div>
            <div className="input-area">
              <div className="input-box">
                <input
                  ref="inputBox"
                  className="input-text-area"
                  type="text"
                  onKeyUp={this.inputHandler}
                  placeholder="Type your message here ..."
                />
              </div>
              <div className="send-button-box">
                <button className="style-button" onClick={this.eventHandler}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{this.state.loginMsg}</div>

      </div>
    );
  }
}

export default PublicChat;
