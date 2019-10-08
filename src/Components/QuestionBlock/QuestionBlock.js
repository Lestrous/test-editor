import React, { Component } from 'react';

class QuestionBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.data.type,
      question: this.props.data.question,
      varients: this.props.data.varients,
      answer: this.props.data.answer,
      userAnswer: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(i, event) {
    let type = this.state.type;
    let userAnswer = [...this.state.userAnswer];
    if (type === "checkbox") {
      let index = userAnswer.indexOf(i.toString());

       if (index === -1) {
           userAnswer.push(i.toString());
       } else {
           userAnswer.splice(index, 1);
       }
       this.setState({ userAnswer });
    } else if (type === "radio") {
      this.setState({ userAnswer: [i.toString()] });
    } else {
      userAnswer[i] = event.target.value;
      this.setState({ userAnswer });
    }
  }

  componentDidUpdate() {
    let answer = this.state.answer;
    let userAnswer = this.state.userAnswer;
    this.props.dataChange(this.props.blockNumber - 1, JSON.stringify(answer) === JSON.stringify(userAnswer));
  }

  answerVarients(type) {
    switch (type) {
      case "radio":
        return this.state.varients.map((elem, i) =>
           <div key={i} className="varient">
            <label>
              <input className="varient__radio" type="radio" value={"" + i} name={this.props.blockNumber} onChange={this.handleChange.bind(this, i)} />
              <p className="varient__answer_text">{elem}</p>
            </label>
           </div>
        )
        break;

      case "checkbox":
        return this.state.varients.map((elem, i) =>
           <div key={i} className="varient">
            <label>
              <input className="varient__checkbox" type="checkbox" value={elem||""} name={this.props.blockNumber} onChange={this.handleChange.bind(this, i)} />
              <p className="varient__answer_text">{elem}</p>
            </label>
           </div>
        )
        break;

      case "text":
        return (
           <div className="varient">
            <input className="varient__text" type="text" placeholder="Ответ" onChange={this.handleChange.bind(this, 0)} />
           </div>
        )
        break;

      case "number":
        return (
           <div className="varient">
            <input className="varient__text" type="number" defaultValue="0" onChange={this.handleChange.bind(this, 0)} />
           </div>
        )
        break;
    }
  }

  render() {
    let type = this.state.type;

    return (
      <div className="questionBlock">
        <p className="blockQuestion__text">{this.state.question}</p>
        <div className="answerVarients">
          {this.answerVarients(type)}
        </div>
      </div>
    );
  }
}

export default QuestionBlock;
