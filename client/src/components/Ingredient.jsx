import React, { Component } from 'react';
import EditIngredientForm from './EditIngredientForm.jsx';

class Ingredient extends Component {
  constructor (props) {
    super(props)
    this.state= {
      editState: false
    }

    this.flipEditState = this.flipEditState.bind(this)
    this.editIngredient = this.editIngredient.bind(this)
    this.deleteIngredient = this.deleteIngredient.bind(this)
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

  deleteIngredient () {
    console.log('INGREDIENT-DELETED.')
    this.props.deleteIngredient(`api/ingredients/${this.props.ingredientId}`, this.props.drinkId);
  }

  render () {
    let {editState} = this.state
    return !editState
    ? <span>
      {
        !this.props.buttonsDisabled &&
        <sup>
          <a onClick={this.deleteIngredient}>ⓧ</a>
        </sup>
      }
      {this.props.description}
      {
        !this.props.buttonsDisabled &&
        <sub>
          <a onClick={this.editIngredient}>*</a>
        </sub>
      }
      </span>
    : <EditIngredientForm
        drinkId={this.props.drinkId}
        ingredientId={this.props.ingredientId}
        description={this.props.description}
        patchIngredient={this.props.patchIngredient}
        flipButtonsDisabled={this.props.flipButtonsDisabled}
        flipEditState={this.flipEditState}
      />
  }
}

export default Ingredient
