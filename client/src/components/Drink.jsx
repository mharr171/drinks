import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react'
import Ingredients from './Ingredients.jsx';
import EditDrinkForm from './EditDrinkForm.jsx';

class Drink extends Component {
  constructor (props) {
    super(props)
    this.state= {
      editState: false
    }

    this.flipEditState = this.flipEditState.bind(this)
    this.editDrink = this.editDrink.bind(this)
    this.deleteDrink = this.deleteDrink.bind(this)
  }

  flipEditState () {
    this.setState(this.state.editState ? {editState:false} : {editState:true})
  }

  editDrink () {
    this.flipEditState()
    this.props.flipButtonsDisabled()
  }

  deleteDrink () {
    this.props.delete(`api/drinks/${this.props.drinkId}`);
  }

  render () {
    let {editState} = this.state
    return !editState
    ? <Container>
        {
          this.props.source && this.props.title && !this.props.buttonsDisabled &&
          <Header as='h2'>
            <sup>
              <a onClick={this.deleteDrink}>ⓧ</a>
            </sup>
            <a href={this.props.source}>{this.props.title}</a>
            <sub>
              <a onClick={this.editDrink}>*</a>
            </sub>
          </Header>
        }
        {
          this.props.source && this.props.title && this.props.buttonsDisabled &&
          <Header as='h2'>
            <a href={this.props.source}>{this.props.title}</a>
            </Header>
        }

        {
          editState &&
          <p>edit state = true</p>
        }

        {
          this.props.description &&
          <p>{this.props.description}</p>
        }

        {
          this.props.ingredients &&
          <Ingredients
            ingredients={this.props.ingredients}
            drinkId={this.props.drinkId}
            postIngredient={this.props.postIngredient}
            flipButtonsDisabled={this.props.flipButtonsDisabled}
            flipEditState={this.flipEditState}
            patchIngredient={this.props.patchDrink}
            buttonsDisabled={this.props.buttonsDisabled}
            deleteIngredient={this.props.deleteIngredient}
          />
        }

        {
          this.props.steps &&
          <p>{this.props.steps}</p>
        }
      </Container>
    : <Container>
        <EditDrinkForm
          drinkId={this.props.drinkId}
          title={this.props.title}
          description={this.props.description}
          steps={this.props.steps}
          source={this.props.source}
          patchDrink={this.props.patchDrink}
          flipButtonsDisabled={this.props.flipButtonsDisabled}
          flipEditState={this.flipEditState}
        />
      </Container>
  }
}

export default Drink
