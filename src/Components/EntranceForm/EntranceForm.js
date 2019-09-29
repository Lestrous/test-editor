import React, { Component } from "react";
import "./EntranceForm.css";
import PropertyField from "../PropertyField/PropertyField";

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

    if (inputUsername && inputPassword) {
      let userPassword = JSON.parse(localStorage.getItem(inputUsername)).password;
      if (inputPassword === userPassword) {
        sessionStorage.setItem("currentUser", inputUsername);
        if (rememberMe) {
          localStorage.setItem("userToRemember", inputUsername);
        } else {
          localStorage.setItem("userToRemember", "");
        }

        this.props.handleSubmit();
      } else {
        alert("Данные введены неверно");
      }
    }
  }

  handleRegistration(evt) {
    evt.preventDefault();

    let username = document.getElementById("RegistrationUsername").value;
    let fullname = document.getElementById("RegistrationFullname").value;
    let email = document.getElementById("RegistrationEmail").value;
    let password = document.getElementById("RegistrationPassword").value;

    let userData = {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      tests: {}
    }
    let serialUserData = JSON.stringify(userData);

    if (username && password) {
      if (!localStorage.getItem(username)) {
        localStorage.setItem(username, serialUserData);
        this.handleOnLogInForm();
      } else {
        alert("Это имя пользователя уже существует");
      }
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
            <button>Вход</button>
            <button onClick={this.handleOnRegistrationForm}>Регистрация</button>
            <form className="LoginForm" onSubmit={this.handleLogin}>
              <h3>Вход</h3>

              <div className="Properties">
                <PropertyField type="text" id="LoginUsername" name="Имя пользователя*" placeholder="Введите имя пользователя" />
                <PropertyField type="password" id="LoginPassword" name="Пароль*" placeholder="Введите ваш пароль" />
              </div>

              <label>
                <p><input id="RememberMe" type="checkbox" />Запомнить меня</p>
              </label>
              <input type="submit" value="Войти" />
            </form>
          </div>
        );
        break;

      case "registration":
        return (
          <div className="EntranceForm">
            <button onClick={this.handleOnLogInForm}>Вход</button>
            <button>Регистрация</button>
            <form className="RegistrationForm" onSubmit={this.handleRegistration}>
              <h3>Регистрация</h3>

              <div className="Properties">
                <PropertyField type="text" id="RegistrationUsername" name="Имя пользователя*" placeholder="Введите имя пользователя" />
                <PropertyField type="text" id="RegistrationFullname" name="Полное имя" placeholder="Введите ваше полное имя" />
                <PropertyField type="text" id="RegistrationEmail" name="Email" placeholder="Введите ваш Email" />
                <PropertyField type="password" id="RegistrationPassword" name="Пароль*" placeholder="Введите ваш пароль" />
              </div>
              <input type="submit" value="Зарегистрироваться" />
            </form>
          </div>
        );
        break;
    }
  }
}

export default EntranceForm;
