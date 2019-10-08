import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleExitBtn = this.handleExitBtn.bind(this);
    this.handleLogoBtn = this.handleLogoBtn.bind(this);
  }

  handleExitBtn() {
    this.props.handleLogout();
  }

  handleLogoBtn() {
    this.props.handleLogoBtn();
  }

  render() {
    let username = this.props.username;
    let userState = this.props.userState;

    switch (userState) {
      case "NotLoggedIn":
        return (
          <div className="header page__header">
            <button className="button logo header__logo" onClick={this.handleLogoBtn}></button>
            <div className="appName header__appName">TestTest</div>
          </div>
        );
        break;

      case "LoggedIn":
        return (
          <div className="header page__header">
           <button className="button logo header__logo" onClick={this.handleLogoBtn}></button>
            <div className="appName header__appName">TestTest</div>
            <div className="userAccount header__userAccount">
              <p className="username header__username">{username}</p>
              <button className="button header__button exitBtn" onClick={this.handleExitBtn}>Выход</button>
            </div>
          </div>
        );
        break;
    }
  }
}

export default Header;
