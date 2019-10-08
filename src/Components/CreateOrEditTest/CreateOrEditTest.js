import React, { Component } from "react";
import CreateQuestionBlock from "../CreateQuestionBlock/CreateQuestionBlock";
import AddQuestionBlock from "../AddQuestionBlock/AddQuestionBlock";

class CreateOrEditTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: this.props.state,
      oldName: this.props.state === "EditTest" ? this.props.test.name : "",
      test: this.props.test || {
        name: "",
        questions: []
      }
    };

    // binds
    {
    this.addQuestionBlock = this.addQuestionBlock.bind(this);
    this.removeQuestionBlock = this.removeQuestionBlock.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleTestNameChange = this.handleTestNameChange.bind(this);
    this.handleFinishBtn = this.handleFinishBtn.bind(this);
    }
  }

  handleTestNameChange() {
    let testName = document.getElementById("testName").value;
    let test = this.state.test;
    test.name = testName;
    this.setState({ test: test });
  }

  handleDataChange(i, data) {
    let questions = this.state.test.questions;
    questions[i] = data;
  }

  addQuestionBlock(type) {
    let test = this.state.test;
    let blank = {
      type: type,
      question: "",
      varients: type === "radio" || type === "checkbox" ? ["", ""] : [""],
      answer: []
    };

    test.questions.push(blank);
    this.setState({ test: test });
  }

  removeQuestionBlock(i) {
    let test = this.state.test;
    let questions = this.state.test.questions;
    questions.splice(i, 1);
    test.questions = questions;
    this.setState({ test });
  }

  QuestionBlockVarients() {
    return this.state.test.questions.map((elem, i) =>
       <div key={Math.random()} className="questionBlockVarient">
        <div className="QuestionBlockNumber">Вопрос №{(i + 1) + "."}</div>
        <CreateQuestionBlock className="CreateQuestionBlock" blockNumber={i + 1} data={elem} dataChange={this.handleDataChange} removeQuestionBlock={this.removeQuestionBlock.bind(this, i)} />
       </div>
    )
  }

  handleFinishBtn() {
    let test = this.state.test;
    let questions = test.questions;

    let username = sessionStorage.getItem("currentUser");
    let testNames = JSON.parse(localStorage.getItem(username)).tests;
    let newName = Object.keys(testNames).indexOf(test.name) === -1;

    let oldName = this.state.oldName;
    let sameName = oldName === test.name;

    if (!test.name) {
      alert("Вы не дали название тесту");
      return;
    }

    if (!newName && !sameName) {
      alert("Тест с таким именем уже существует");
      return;
    }

    if (questions.length === 0) {
      alert("В тесте нет ни одного вопроса");
      return;
    }
    
    for (let i = 0; i < questions.length; i++) {
      let condition = questions[i].question && 
                      questions[i].varients.length !== 0 && 
                      questions[i].answer.length !== 0;
      if (!condition) {
        alert("Вы заполнили не все данные");
        return;
      }
    }

    let state = this.state.state;
    if (state === "CreateTest") {
      this.props.createTest(test);
    } else if (state === "EditTest") {
      this.props.editTest(test, oldName);
    }
    this.props.back();
  }

  

  render() {
    return (
      <div className="CreateOrEditTest">
        <h2 className="heading heading_level_2">Создание теста</h2>
        <label>
          <p className="CreateOrEditTest__description">Введите название вашего теста:</p>
          <input className="testNameCreation" id="testName" defaultValue={this.state.test.name} onChange={this.handleTestNameChange.bind(this)} />
        </label>
        <div className="questions">
          {this.QuestionBlockVarients()}
        </div>
        <AddQuestionBlock submitBtn={this.addQuestionBlock}/>
        <button id="finishBtn" className="button finishBtn button_style_yellow" onClick={this.handleFinishBtn}>Готово</button>
      </div>
    );
  }
}

export default CreateOrEditTest;
