import React, { Component } from "react";

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
       <button key={Math.random()} className="button tests__item" onClick={this.handleChooseTestBtn.bind(this, elem, i)}>
         <div className="tests__img"></div>
         <div className="tests__text">{elem}</div>
       </button>
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
        <div className="tests ChooseTest__tests">
          {this.testVarients()}
        </div>
      </div>
    );
  }
}

export default ChooseTest;
