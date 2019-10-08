import React, { Component } from "react";

class AddQuestionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "AddQuestionBlock"
    };

    // binds
    {
    this.handleAddQuestionBlockBtn = this.handleAddQuestionBlockBtn.bind(this);
    this.handleCreateQuestionBlockBtn = this.handleCreateQuestionBlockBtn.bind(this);
    this.handleCancelQuestionBlockBtn = this.handleCancelQuestionBlockBtn.bind(this);
    }
  }

  handleAddQuestionBlockBtn() {
    let finishBtn = document.querySelector('#finishBtn');
    finishBtn.classList.add('not-activeBtn');
    this.setState({ state: "ChooseTypeOfQuestionBlock" });
  }

  handleCreateQuestionBlockBtn() {
    let finishBtn = document.querySelector('#finishBtn');
    finishBtn.classList.remove('not-activeBtn');

    let form = document.forms[0];
    let select = form.elements.QuestionBlockType;
    let option;

    for (let i = 0; i < select.options.length; i++) {
      option = select.options[i];
      if (option.selected) {
        this.props.submitBtn(option.value);
        break;
      }
    }

    this.setState({ state: "AddQuestionBlock" });
  }

  handleCancelQuestionBlockBtn() {
    let finishBtn = document.querySelector('#finishBtn');
    finishBtn.classList.remove('not-activeBtn');
    this.setState({ state: "AddQuestionBlock" });
  }

  render() {
    let state = this.state.state;

    switch (state) {
      case "AddQuestionBlock":
        return (
          <div className="AddQuestionBlock">
            <button className="button AddQuestionBlockBtn button_style_blue" onClick={this.handleAddQuestionBlockBtn}>Добавить вопрос</button>
          </div>
        );
        break;

      case "ChooseTypeOfQuestionBlock":
        return (
          <form className="ChooseTypeOfQuestionBlock" onSubmit={this.handleCreateQuestionBlockBtn}>
            <div className="QuestionBlockType__inner">
              <select name="QuestionBlockType" className="QuestionBlockType">
                <option value="radio">Один вариант ответа</option>
                <option value="checkbox">Один или несколько вариантов ответа</option>
                <option value="text">Свободный тестовый ответ</option>
                <option value="number">Числовой ответ</option>
              </select>
            </div>
            <button className="button CancelQuestionBlockBtn button_style_blue" onClick={this.handleCancelQuestionBlockBtn}>Отмена</button>
            <input className="button CreateQuestionBlockBtn button_style_yellow" type="submit" value="Создать вопрос"/>
          </form>
        );
        break;
      }
  }
}

export default AddQuestionBlock;
