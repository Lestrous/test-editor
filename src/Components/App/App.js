import React, { Component } from "react";
// import { all } from '../../scripts/script.js';
import EntranceForm from "../EntranceForm/EntranceForm.js";
import Header from "../Header/Header.js";
import PassTest from "../PassTest/PassTest.js";
import CreateOrEditTest from "../CreateOrEditTest/CreateOrEditTest.js";
import ChooseTest from "../ChooseTest/ChooseTest.js";

class App extends Component {
  constructor(props) {
    super(props);

    sessionStorage.setItem("currentUser", localStorage.getItem("userToRemember") ? localStorage.getItem("userToRemember") : "");

    this.state = {
      page: localStorage.getItem("userToRemember") ? "MainPage" : "Entrance",
      nextPage: "",
      data: []
    };

    //binds
    {
      this.handleOnMainPage = this.handleOnMainPage.bind(this);
      this.handleOnEntrancePage = this.handleOnEntrancePage.bind(this);
      this.handlePassTestPage = this.handlePassTestPage.bind(this);
      this.handleCreateTestPage = this.handleCreateTestPage.bind(this);
      this.handleEditTestPage = this.handleEditTestPage.bind(this);
      this.handleChooseTestPage = this.handleChooseTestPage.bind(this);
      this.handleChosenTest = this.handleChosenTest.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.createTest = this.createTest.bind(this);
      this.editTest = this.editTest.bind(this);
      this.deleteTest = this.deleteTest.bind(this);
    }
  }

  handleLogout() {
    sessionStorage.setItem("currentUser", "");
    localStorage.setItem("userToRemember", "");
    this.handleOnEntrancePage();
  }

  handleOnMainPage() {
    this.setState({ page: "MainPage" });
  }

  handleOnEntrancePage() {
    this.setState({ page: "Entrance" });
  }

  handlePassTestPage(data) {
    this.setState({ page: "PassTest", data: data });
  }

  handleCreateTestPage() {
    this.setState({ page: "CreateTest" });
  }

  handleEditTestPage(data) {
    this.setState({ page: "EditTest", data: data });
  }

  handleChooseTestPage(nextPage) {
    this.setState({ page: "ChooseTest", nextPage: nextPage });
  }

  handleChosenTest(nextPage, test, testName) {
    if (nextPage === "PassTest") {
      this.handlePassTestPage(test);
    } else if (nextPage === "EditTest") {
      this.handleEditTestPage(test);
    } else if (nextPage === "DeleteTest") {
      this.deleteTest(testName);
    }
  }

  createTest(test) {
    let username = sessionStorage.getItem("currentUser");

    let userData = JSON.parse(localStorage.getItem(username));
    userData.tests[test.name] = test.questions;

    let serialUserData = JSON.stringify(userData);
    localStorage.setItem(username, serialUserData);
  }

  editTest(test, oldName) {
    let username = sessionStorage.getItem("currentUser");

    let userData = JSON.parse(localStorage.getItem(username));

    delete userData.tests[oldName];

    userData.tests[test.name] = test.questions;

    let serialUserData = JSON.stringify(userData);
    localStorage.setItem(username, serialUserData);
  }

  deleteTest(testName) {
    let username = sessionStorage.getItem("currentUser");

    let userData = JSON.parse(localStorage.getItem(username));

    delete userData.tests[testName];

    let serialUserData = JSON.stringify(userData);
    localStorage.setItem(username, serialUserData);
  }

  componentDidMount () {
    // let viewportWidth = window.innerWidth;	// ширина страницы
    // console.log("width: " + viewportWidth);

    // jQuery
    // all();
  }

  render() {
    let page = this.state.page;

    let username;
    let userData;
    let testsExistence;
    let testNames;
    if (page !== "Entrance") {
      username = sessionStorage.getItem("currentUser");
      userData = JSON.parse(localStorage.getItem(username));
      if (userData) {
        testsExistence = Object.keys(userData.tests).length !== 0;
        testNames = Object.keys(userData.tests);
      }
    }

    switch (page) {
      case "Entrance":
        return (
          <div className="page">
           <div className="fixed-container">
            <Header userState="NotLoggedIn" />
            <EntranceForm handleSubmit={this.handleOnMainPage}/>
            </div>
          </div>
        );
        break;

      case "MainPage":
        return (
          <div className="page">
            <div className="fixed-container">
              <Header userState="LoggedIn" username={username} handleLogout={this.handleLogout} handleLogoBtn={this.handleOnMainPage} />
              <div className="page__description">TestTest&nbsp;&mdash; удобный сервис для создания тестов и&nbsp;опросов.</div>
              <div className="page__description">Создавай свои или проходи готовые!</div>
              <div className="testsMenu">
                <button className="button choiceBtn choiceBtn_style_blue" disabled={!testsExistence} onClick={this.handleChooseTestPage.bind(this, "PassTest")}>Пройти тесты</button>
                <button className="button choiceBtn choiceBtn_style_yellow" onClick={this.handleCreateTestPage}>Создать тест</button>
                <button className="button choiceBtn choiceBtn_style_pink" disabled={!testsExistence} onClick={this.handleChooseTestPage.bind(this, "EditTest")}>Редактировать тесты</button>
                <button className="button choiceBtn choiceBtn_style_grey" disabled={!testsExistence} onClick={this.handleChooseTestPage.bind(this, "DeleteTest")}>Удалить тесты</button>
              </div>
            </div>
          </div>
        );
        break;

      case "ChooseTest":
        return (
          <div className="page">
            <div className="fixed-container">
              <Header userState="LoggedIn" username={username} handleLogout={this.handleLogout} handleLogoBtn={this.handleOnMainPage} />
              <div className="fixed-container">
              <div className="page__description">TestTest&nbsp;&mdash; удобный сервис для создания тестов и&nbsp;опросов.</div>
              <div className="page__description">Создавай свои или проходи готовые!</div>
                <ChooseTest nextPage={this.state.nextPage} tests={testNames} handleChosenTest={this.handleChosenTest} />
                <button className="button backBtn" onClick={this.handleOnMainPage}>Назад</button>
              </div>
            </div>
          </div>
        );
        break;

      case "PassTest":
        return (
          <div className="page">
            <div className="fixed-container">
              <Header userState="LoggedIn" username={username} handleLogout={this.handleLogout} handleLogoBtn={this.handleOnMainPage} />
              <PassTest test={this.state.data} back={this.handleOnMainPage} />
              <button className="button backBtn" onClick={this.handleChooseTestPage.bind(this, "PassTest")}>Назад</button>
            </div>
          </div>
        );
        break;

      case "CreateTest":
        return (
          <div className="page">
            <div className="fixed-container">
              <Header userState="LoggedIn" username={username} handleLogout={this.handleLogout} handleLogoBtn={this.handleOnMainPage} />
              <CreateOrEditTest state="CreateTest" createTest={this.createTest} back={this.handleOnMainPage} />
              <button className="button backBtn" onClick={this.handleOnMainPage}>Назад</button>
            </div>
          </div>
        );
        break;

      case "EditTest":
        return (
          <div className="page">
            <div className="fixed-container">
              <Header userState="LoggedIn" username={username} handleLogout={this.handleLogout} handleLogoBtn={this.handleOnMainPage} />
              <CreateOrEditTest state="EditTest" test={this.state.data} editTest={this.editTest} back={this.handleOnMainPage} />
              <button className="button backBtn" onClick={this.handleChooseTestPage.bind(this, "EditTest")}>Назад</button>
            </div>
          </div>
        );
        break;
    }
  }
}

export default App;
