import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleExitBtn = this.handleExitBtn.bind(this);
  }

  handleExitBtn() {
    this.props.handleLogout();
  }

  render() {
    let username = this.props.username;
    let userState = this.props.userState;

    switch (userState) {
      case "NotLoggedIn":
        return (
          <div className="header">
            <div className="logo">
              <p>LogoPic</p>
            </div>
            <div className="appName">
              <p>TestEditorPro 1.1</p>
            </div>
          </div>
        );
        break;

      case "LoggedIn":
        return (
          <div className="header">
            <div className="logo">
              <p>NiceLogoPic</p>
            </div>
            <div className="appName">
              <p>TestEditorPro 1.1</p>
            </div>
            <div className="userAcc">
              <p className="username">{username}</p>
              <button className="exitBtn" onClick={this.handleExitBtn}>Выход</button>
            </div>
          </div>
        );
        break;
    }
  }
}

export default Header;
