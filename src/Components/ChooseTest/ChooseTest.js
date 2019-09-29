import React, { Component } from "react";
import "./ChooseTest.css";

class ChooseTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: this.props.tests
    }

    this.removeTest = this.removeTest.bind(this);
    this.handleChooseTestBtn = this.handleChooseTestBtn.bind(this);
  };

  removeTest(i) {
    let tests = this.state.tests;
    tests.splice(i, 1);
    this.setState({ tests: tests });
  }

  testVarients() {
    return this.state.tests.map((elem, i) =>
       <div key={Math.random()} className="testVarient">
        <button className="chooseTestBtn" onClick={this.handleChooseTestBtn.bind(this, elem, i)}>{elem}</button>
       </div>
    )
  }

  handleChooseTestBtn(elem, i) {
    let chosenTest = {
      name: "",
      questions: []
    }

    let username = sessionStorage.getItem("currentUser");

    let userData = JSON.parse(localStorage.getItem(username));
    chosenTest.name = elem;
    chosenTest.questions = userData.tests[elem];

    if (this.props.nextPage === "DeleteTest") {
      let permission = window.confirm("Вы действительно хотите удалить этот тест?");
      if (permission) {
        this.removeTest(i);
        this.props.handleChosenTest(this.props.nextPage, chosenTest, chosenTest.name);
      }
    } else {
      this.props.handleChosenTest(this.props.nextPage, chosenTest, chosenTest.name);
    }
  }

  render() {
    return (
      <div className="ChooseTest">
        <h1>Выберите Тест</h1>
        <div className="tests">
          {this.testVarients()}
        </div>
      </div>
    );
  }
}

export default ChooseTest;
