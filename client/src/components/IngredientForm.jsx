import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      description: ''
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this)
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
    this.props.postIngredient(`api/drinks/${this.props.drinkId}/ingredients`, data, this.props.drinkId);
  }

  cancel (e) {
    e.preventDefault();

    this.props.showButton();
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Ingredient:</label>
          <input value={this.state.description} onChange={this.handleDescriptionChange} />
        </div>

        <Button type="submit" className="ui-button">Submit</Button>
        <Button onClick={this.cancel} className="ui-button">Cancel</Button>
      </Form>
    );
  }
}

export default IngredientForm
