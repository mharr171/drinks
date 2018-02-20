import React, { Component } from 'react';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      description: ''
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();

    const data = {
      description: this.state.description,
    };

    console.log(data);
    this.props.showButton();
    this.props.flipButtonsDisabled();
    this.props.postIngredient(`api/drinks/${this.props.drinkId}/ingredients`, data, this.props.drinkId);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>
            Description:
            <input type="textarea" value={this.state.description} onChange={this.handleDescriptionChange} />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default IngredientForm
