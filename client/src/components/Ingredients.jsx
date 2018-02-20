import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react'
import Ingredient from './Ingredient.jsx';
import IngredientForm from './IngredientForm.jsx';

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
       newForm: false
    };

    this.showNewForm = this.showNewForm.bind(this);
    this.showButton = this.showButton.bind(this);
  }

  showNewForm () {
    this.props.flipButtonsDisabled();
    this.setState({newForm: true});
  }

  showButton () {
    this.setState({newForm: false});
  }

  render () {
    let {newForm} = this.state
    return (
      <div>
        {
          this.props.ingredients &&
          <Segment.Group>
            {Object.keys(this.props.ingredients).map((key) => {
              return(
                <Segment key={key}>
                  <Ingredient
                    drinkId={this.props.drinkId}
                    ingredientId={this.props.ingredients[key].id}
                    description={this.props.ingredients[key].description}
                    patchIngredient={this.props.patchIngredient}
                    buttonsDisabled={this.props.buttonsDisabled}
                    flipButtonsDisabled={this.props.flipButtonsDisabled}
                    deleteIngredient={this.props.deleteIngredient}
                  />
                </Segment>
              )
            })}
            <Segment>
              {
                newForm &&
                <IngredientForm
                  drinkId={this.props.drinkId}
                  postIngredient={this.props.postIngredient}
                  flipButtonsDisabled={this.props.flipButtonsDisabled}
                  showButton={this.showButton}
                />
              }

              {
                !newForm &&
                <span>
                  {
                    !this.props.buttonsDisabled &&
                    <Button onClick={this.showNewForm}>+</Button>
                  }
                  {
                    this.props.buttonsDisabled &&
                    <Button disabled onClick={this.showNewForm}>+</Button>
                  }
                </span>
              }

            </Segment>
          </Segment.Group>
        }
      </div>
    );
  }
}

export default Ingredients
