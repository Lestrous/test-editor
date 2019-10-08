import React, { Component } from "react";
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
         <div className="QuestionBlockNumber">Вопрос №{(i + 1) + "."}</div>
         <QuestionBlock className="QuestionBlock" blockNumber={i + 1} data={elem} dataChange={this.handleDataChange} />
       </div>
    )
  }

  handleFinishBtn() {
    let test = this.state.test;
    let questions = test.questions;
    let amount = questions.length;
    let right = this.state.right;
    let rightAmount = right.filter(x => x === 1).length;

    alert("Вы ответили правильно на " + rightAmount + " ответов из " + amount);
    this.props.back();
  }

  render() {
    return (
      <div className="PassTest">
        <p className="PassTest__testName">{this.state.test.name}</p>
        <div className="PassTest__questions">
          {this.QuestionBlockVarients()}
        </div>
        <button className="button PassTest__button finishBtn button_style_yellow" onClick={this.handleFinishBtn}>Готово</button>
      </div>
    );
  }
}

export default PassTest;
