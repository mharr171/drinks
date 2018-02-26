import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import ShowDrink from './display/ShowDrink.jsx'
import EditDrink from './display/EditDrink.jsx'
import NewDrink from './display/NewDrink.jsx'

class Body extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Grid.Column>
        { this.display() }
      </Grid.Column>
    );
  }

  display () {
    if (this.props.showDrink){
      return (
        <ShowDrink
          title={this.props.drink.title}
          source={this.props.drink.source}
          ingredients={this.props.drink.ingredients}
          description={this.props.drink.description}
          steps={this.props.drink.steps}
        />
      );
    }else if (this.props.editDrink){
      return (
        <EditDrink
          drink={this.props.drink}
          ingredients={this.props.drink.ingredients}
          newIngredient={this.props.newIngredient}
          makingEdit={this.props.makingEdit}
          patch={this.props.patchDrink}
          post={this.props.postIngredient}
          updateDrinks={this.props.updateDrinks}
          click_editField={this.props.click_editField}
          click_newIngredientButton={this.props.click_newIngredientButton}
          click_cancelEditIngredientButton={this.props.click_cancelEditIngredientButton}
        />
      );
    }else if (this.props.newDrink){
      return (
        <NewDrink
          post={this.props.postDrink}
        />
      );
    }
  }

}



export default Body
