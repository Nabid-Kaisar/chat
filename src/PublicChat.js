import React, { Component } from "react";
import "./App.css";
import "./styleChatApp.css";
import Comp1 from "./messageContainer.js";
import io from "socket.io-client";

class PublicChat extends Component {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.clearInputField = this.clearInputField.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.recentChat = this.recentChat.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.sender  = this.sender.bind(this);

    this.state = {
      inputArray: [],
      inputText: "",
      currenTime: "",
      loginMsg: "",
      loginStatus: false,
      currentUserName: ""
    };

    this.socket = io("localhost:5000");
    this.socket.on("RECEIVE_MESSAGE", data => {
      this.addMsg(data);
    });
  }

  //socket code
  async addMsg(data){
    // console.log("addMsg data");
    // console.log(data);
    let person = {
      text: data.text,
      dateTime: data.time
    };
    if (this.state.loginStatus === true) {
      await this.setState({
        inputArray: [...this.state.inputArray, person]
      });
    }

    let grabbableId = this.state.inputArray.length - 1;
    let grabbedElement = document.getElementById(grabbableId);

    if(grabbedElement != null){
      grabbedElement.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest"
      });}

  };

  sendMsg = e => {
    this.clearInputField();

    this.socket.emit("SEND_MESSAGE", {
      // text: `${this.state.currentUserName}: ${this.state.inputText}`,
      // dateTime: this.state.currenTime
      text: `${this.state.currentUserName}: ${this.state.inputText}`,
      time: new Date().toLocaleTimeString()
    });
    this.sender();
  };
  //socket ended

  //new helper function to work with socket
   sender(){
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
          if (resJson.success === false) {
            //not logged IN
            this.setState({
              loginMsg:
                "You are not logged in. Please login to participate in chat! Thank you"
            });
            this.setState({ loginStatus: false });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  inputHandler(event) {
    this.setState({ inputText: event.target.value });
    this.setState({ currenTime: new Date().toLocaleTimeString() });

    if (event.keyCode === 13 && this.state.inputText !== "") {
      // this.setState({ inputText: event.target.value });
      this.sendMsg();
      this.clearInputField();
    }
  }

  //didMount Data fetching helper method
  async recentChat(username, msg, time) {
    let person = {
      text: `${username}: ${msg}`,
      dateTime: time
    };

    await this.setState({
      inputArray: [...this.state.inputArray, person]
    });

  }

  clearInputField() {
    let inputBox = this.refs.inputBox;
    inputBox.value = "";
    this.setState({ inputText: "" });
  }

  //check if logged in with session or not
  checkStatus() {
    fetch("http://localhost:5000/status", { credentials: "include" })
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

  //filling up array from database
  componentDidMount() {
    fetch("http://localhost:5000/recentchat", { credentials: "include" })
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
          for (var i = 9; i >= 0; i--) {
            this.recentChat(
              resJson.data[i].username,
              resJson.data[i].chatmsg,
              resJson.data[i].time
            );
          }
        } else {
          console.log("error");
        }
      })
      .catch(err => {
        console.log(err);
      });

    //fetch to get the username of current session username
    fetch("http://localhost:5000/secret", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        console.log("json response: ", resJson);
        console.log(resJson.success);
        //console.log(resJson.data);
        if (resJson.success === true) {
          console.log(resJson.name.username);
          this.setState({ currentUserName: resJson.name.username });
        } else {
          console.log("error");
        }
      })
      .catch(err => {
        console.log(err);
      });

      const showMessage = this.state.inputArray.map((item, idx) => {
        return <Comp1 inputValueText={item} idProps={idx} key={idx} />;
      });
  }

  render() {
    //  console.log(this.state.inputArray)
    const showMessage = this.state.inputArray.map((item, idx) => {
      return <Comp1 inputValueText={item} idProps={idx} key={idx} />;
    });

    this.checkStatus();

    return (
      <div>
        <div className="chatbox-head-container">
          <div className="chat-container">
            <div className="menu-content">
              <h4><span className="dotRed"></span> Public Chat</h4>
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
                <button className="style-button" onClick={this.sendMsg}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="loginMsg">{this.state.loginMsg}</div>
      </div>
    );
  }
}

export default PublicChat;
