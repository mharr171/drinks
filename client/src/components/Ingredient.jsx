import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import EditIngredientForm from './EditIngredientForm.jsx';

class Ingredient extends Component {
  constructor (props) {
    super(props)
    this.state= {
      editState: false
    }

    this.flipEditState = this.flipEditState.bind(this)
    this.editIngredient = this.editIngredient.bind(this)

  }

  componentDidMount () {

  }

  flipEditState () {
    this.setState(this.state.editState ? {editState:false} : {editState:true})
  }

  editIngredient () {
    this.flipEditState()
    this.props.flipButtonsDisabled()
  }

  render () {
    let {editState} = this.state
    return !editState
    ? <span>
      {this.props.description}
      {
        !this.props.buttonsDisabled &&
        <sub>
          <a onClick={this.editIngredient}>*</a>
        </sub>
      }
      </span>
    : <EditIngredientForm
        ingredientId={this.props.ingredientId}
        description={this.props.description}
        patchIngredient={this.props.patchIngredient}
        flipButtonsDisabled={this.props.flipButtonsDisabled}
        flipEditState={this.flipEditState}
        patchIngredient={this.props.patchIngredient}
      />
  }
}

export default Ingredient
