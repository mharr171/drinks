import React, { Component } from 'react';

class EditIngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      description: ''
    };
    this.setAttributes = this.setAttributes.bind(this)

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setAttributes()
  }

  setAttributes () {
    this.setState({description: this.props.description});
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

    this.props.flipButtonsDisabled();
    this.props.flipEditState();
    this.props.patchIngredient(`api/ingredients/${this.props.ingredientId}`, data, this.props.ingredientId);
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

export default EditIngredientForm
