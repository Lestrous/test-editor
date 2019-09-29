import React, { Component } from "react";
import "./PassTest.css";
import QuestionBlock from "../QuestionBlock/QuestionBlock";

class PassTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: this.props.test,
      right: []
    };

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleFinishBtn = this.handleFinishBtn.bind(this);
  }

  handleDataChange(i, data) {
    let right = this.state.right;
    right[i] = data ? 1 : 0;
    this.state.right = right;
  }

  QuestionBlockVarients() {
    return this.state.test.questions.map((elem, i) =>
       <div key={Math.random()} className="questionBlockVarient">
         <div className="divQuestionBlockNumber">
          <p className="questionBlockNumber">{(i + 1) + "."}</p>
         </div>
         <QuestionBlock className="QuestionBlock" blockNumber={i + 1} data={elem} dataChange={this.handleDataChange} />
       </div>
    )
  }

  handleFinishBtn() {
    let test = this.state.test;
    let questions = test.questions;
    let amount = questions.length;
    let right = this.state.right;
    let rightAmount = right.filter(x => x===1).length;

    alert("Вы ответили правильно на " + rightAmount + " ответов из " + amount);
    this.props.back();
  }

  render() {
    let right = this.state.right;

    return (
      <div className="PassTest">
        <p className="testName">{this.state.test.name}</p>
        <div className="questions">
          {this.QuestionBlockVarients()}
        </div>
        <button className="finishBtn" onClick={this.handleFinishBtn}>Готово</button>
      </div>
    );
  }
}

export default PassTest;
