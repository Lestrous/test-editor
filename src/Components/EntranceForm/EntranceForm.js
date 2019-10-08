import React, { Component } from "react";

class EntranceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: "login" };

    // binds
    {
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleOnLogInForm = this.handleOnLogInForm.bind(this);
    this.handleOnRegistrationForm = this.handleOnRegistrationForm.bind(this);
    }
  }

  handleLogin(evt) {
    evt.preventDefault();

    let inputUsername = document.getElementById("LoginUsername").value;
    let inputPassword = document.getElementById("LoginPassword").value;
    let rememberMe = document.getElementById("RememberMe").checked;

    if (!inputUsername || !inputPassword) {
      return;
    }

    let userPassword = JSON.parse(localStorage.getItem(inputUsername)).password;
    
    if (inputPassword !== userPassword) {
      alert("Данные введены неверно");
      return;
    }

    sessionStorage.setItem("currentUser", inputUsername);
    
    if (rememberMe) {
      localStorage.setItem("userToRemember", inputUsername);
    } else {
      localStorage.setItem("userToRemember", "");
    }

    this.props.handleSubmit();
  }

  handleRegistration(evt) {
    evt.preventDefault();

    let username = document.getElementById("RegistrationUsername").value;
    let email = document.getElementById("RegistrationEmail").value;
    let password = document.getElementById("RegistrationPassword").value;

    let userData = {
      username: username,
      email: email,
      password: password,
      tests: {}
    }
    let serialUserData = JSON.stringify(userData);

    if (!username || !password) {
      return;
    }

    if (!localStorage.getItem(username)) {
      localStorage.setItem(username, serialUserData);
      this.handleOnLogInForm();
    } else {
      alert("Это имя пользователя уже существует");
    }
  }

  handleOnLogInForm() {
    this.setState({ form: "login" });
  }

  handleOnRegistrationForm() {
    this.setState({ form: "registration" });
  }

  render() {
    let form = this.state.form;

    switch (form) {
      case "login":
        return (
          <div className="EntranceForm">
            <form className="form LoginForm" onSubmit={this.handleLogin}>
              <div className="Properties form__Properties">
                <input id="LoginUsername" className="Properties__input input_style_username" type="text" placeholder="Имя и Фамилия" />
                <input id="LoginPassword" className="Properties__input input_style_password" type="password" placeholder="Пароль" />
              </div>

              <label>
                <p className="from__text"><input id="RememberMe" className="form__checkbox" type="checkbox" />Запомнить меня</p>
              </label>
              <input className="button form__button button_style_blue" type="submit" value="Войти" />
            </form>

            <button className="button EntranceForm__button EntranceForm__signUp_button" onClick={this.handleOnRegistrationForm}>Зарегестрироваться</button>
          </div>
        );
        break;

      case "registration":
        return (
          <div className="EntranceForm">
            <form className="form RegistrationForm" onSubmit={this.handleRegistration}>
              <div className="Properties form__Properties">
                <input id="RegistrationUsername" className="Properties__input input_style_username" type="text" placeholder="Имя и Фамилия" />
                <input id="RegistrationEmail" className="Properties__input input_style_email" type="text" placeholder="Email" />
                <input id="RegistrationPassword" className="Properties__input input_style_password" type="password" placeholder="Пароль" />
              </div>
              <input className="button form__button button_style_blue" type="submit" value="Зарегистрироваться" />
            </form>

            <button className="button EntranceForm__button EntranceForm__signIn_button" onClick={this.handleOnLogInForm}>Войти</button>
          </div>
        );
        break;
    }
  }
}

export default EntranceForm;
