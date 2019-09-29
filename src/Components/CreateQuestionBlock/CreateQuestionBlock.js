import React, { Component } from 'react';
import './CreateQuestionBlock.css';

class CreateQuestionBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.data.type,
      question: this.props.data.question,
      varients: this.props.data.varients,
      answer: this.props.data.answer
    };

    // binds
    {
    this.addVarient = this.addVarient.bind(this);
    this.removeVarient = this.removeVarient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    }
  }

  handleDataChange() {
    this.props.dataChange(this.props.blockNumber - 1, this.state);
  }

  handleQuestionChange(questionNumber){
    let question = document.getElementById("Question" + questionNumber).value;
    this.setState({ question: question });
  }

  addVarient(type){
    this.setState(prevState => ({ varients: [...prevState.varients, ""]}));
  }

  removeVarient(i){
    if (this.state.varients.length > 2) {
      let varients = [...this.state.varients];
      varients.splice(i, 1);
      this.setState({ varients });

      let type = this.state.type;
      let answer = [...this.state.answer];
      if (type === "checkbox") {
        let index = answer.indexOf(i.toString());

        if (index !== -1) {
          answer.splice(index, 1);
        }

        for (let j = 0; j < answer.length; j++) {
          if (i < parseInt(answer[j])) {
            answer[j] = (parseInt(answer[j]) - 1).toString();
          }
        }
        this.setState({ answer });

      } else if (type === "radio") {
        if (i < parseInt(answer[0])) {
          this.setState({ answer: [(parseInt(answer[0]) - 1).toString()] });
        } else if (i === parseInt(answer[0])) {
          this.setState({ answer: [""] });
        }
      }
    }
  }

  handleChange(i, event) {
    let type = this.state.type;

    let varients = [...this.state.varients];
    varients[i] = event.target.value;
    this.setState({ varients });

    if (type === "text" || type === "number") {
      this.setState({ answer: varients });
    }
  }

  handleCheck(i, event) {
    let type = this.state.type;
    let answer = [...this.state.answer];
    if (type === "checkbox") {
      let index = answer.indexOf(i.toString());

       if (index === -1) {
           answer.push(i.toString());
       } else {
           answer.splice(index, 1);
       }
       this.setState({ answer });
    } else if (type === "radio") {
      this.setState({ answer: [i.toString()] });
    }
  }

  answerVarients(type) {
    switch (type) {
      case "radio":
        return this.state.varients.map((el, i) =>
           <div key={i} className="varient">
            <p className="varientNumber">{(i + 1) + "."}</p>
            <input type="radio" value={"" + i} name={this.props.blockNumber}  checked={this.state.answer.indexOf(i.toString()) !== -1 ? true : false} onChange={this.handleCheck.bind(this, i)} />
            <input type="text" placeholder="Вариант ответа" value={el||''} onChange={this.handleChange.bind(this, i)} />
            <input type="button" value="Удалить" onClick={this.removeVarient.bind(this, i)} />
           </div>
        )
        break;

      case "checkbox":
        return this.state.varients.map((el, i) =>
           <div key={i} className="varient">
            <p className="varientNumber">{(i + 1) + "."}</p>
            <input type="checkbox" value={el||""} name={this.props.blockNumber} checked={this.state.answer.indexOf(i.toString()) !== -1 ? true : false} onChange={this.handleCheck.bind(this, i)} />
            <input type="text" placeholder="Вариант ответа" value={el||''} onChange={this.handleChange.bind(this, i)} />
            <input type="button" value="Удалить" onClick={this.removeVarient.bind(this, i)} />
           </div>
        )
        break;

      case "text":
        return (
           <div className="varient">
            <input type="text" defaultValue={this.state.answer[0]} placeholder="Ответ" onChange={this.handleChange.bind(this, 0)} />
           </div>
        )
        break;

      case "number":
        return (
           <div className="varient">
            <input type="number"  defaultValue={parseInt(this.state.answer[0]) || 0} onChange={this.handleChange.bind(this, 0)} />
           </div>
        )
        break;
    }
  }

  componentDidUpdate() {
  }

  render() {
    let type = this.state.type;
    this.handleDataChange();

    if (type === "radio" || type === "checkbox") {
      return (
        <div className="createQuestionBlock">
          <input id={"Question" + this.props.blockNumber} type="text" defaultValue={this.state.question} placeholder="Вопрос" onChange={this.handleQuestionChange.bind(this, this.props.blockNumber)} />
          <div className="answerVarients">
            {this.answerVarients(type)}
          </div>
          <input type="button" value="Добавить вариант" onClick={this.addVarient.bind(this, type)} />
        </div>
      );
    } else {
      return (
        <div className="createQuestionBlock">
          <input id={"Question" + this.props.blockNumber} type="text" defaultValue={this.state.question} placeholder="Вопрос" onChange={this.handleQuestionChange.bind(this, this.props.blockNumber)} />
          <div className="answerVarients">
            {this.answerVarients(type)}
          </div>
        </div>
      );

    }
  }
}

export default CreateQuestionBlock;
