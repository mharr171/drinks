import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

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
    this.cancel = this.cancel.bind(this);
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

    this.props.flipEditState();
    this.props.patchIngredient(`api/ingredients/${this.props.ingredientId}`, data, this.props.drinkId);
  }

  cancel (e) {
    e.preventDefault();

    this.props.flipEditState();
  }
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Ingredient:</label>
          <input value={this.state.description} onChange={this.handleDescriptionChange} />
        </div>

        <Button type="submit" className="ui-button">Save</Button>
        <Button onClick={this.cancel} className="ui-button">Cancel</Button>
      </Form>
    );
  }
}

export default EditIngredientForm
