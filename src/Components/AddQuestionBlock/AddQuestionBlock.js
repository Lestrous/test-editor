import React, { Component } from "react";
import "./AddQuestionBlock.css";

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
    this.setState({ state: "ChooseTypeOfQuestionBlock" });
  }

  handleCreateQuestionBlockBtn() {
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
    this.setState({ state: "AddQuestionBlock" });
  }

  render() {
    let state = this.state.state;

    switch (state) {
      case "AddQuestionBlock":
        return (
          <div className="AddQuestionBlock">
            <button className="AddQuestionBlockBtn" onClick={this.handleAddQuestionBlockBtn}>Добавить вопрос</button>
          </div>
        );
        break;

      case "ChooseTypeOfQuestionBlock":
        return (
          <form className="ChooseTypeOfQuestionBlock" onSubmit={this.handleCreateQuestionBlockBtn}>
            <button className="CancelQuestionBlockBtn" onClick={this.handleCancelQuestionBlockBtn}>Отмена</button>
            <select name="QuestionBlockType" className="QuestionBlockType">
              <option value="radio">Один вариант ответа</option>
              <option value="checkbox">Один или несколько вариантов ответа</option>
              <option value="text">Свободный тестовый ответ</option>
              <option value="number">Числовой ответ</option>
            </select>
            <input type="submit" className="CreareQuestionBlockBtn" value="Создать вопрос"/>
          </form>
        );
        break;
      }
  }
}

export default AddQuestionBlock;
