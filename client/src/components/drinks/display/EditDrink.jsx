import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import EditTitle from '../form/EditTitle.jsx'
import EditSource from '../form/EditSource.jsx'
import EditIngredient from '../form/EditIngredient.jsx'
import NewIngredient from '../form/NewIngredient.jsx'
import EditDescription from '../form/EditDescription.jsx'
import EditSteps from '../form/EditSteps.jsx'

class EditDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Segment.Group>
        <EditTitle
          title={this.props.drink.title}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />

        <EditSource
          source={this.props.drink.source}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />

        <EditDescription
          description={this.props.drink.description}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />

        <Segment>
          <h5>Ingredients</h5>
          <Segment.Group>

            {
              this.props.ingredients.map((ingredient, key) => {
                return (
                  <Segment key={key}>
                    <EditIngredient
                      drinkId={this.props.drink.id}
                      drink={this.props.drink}
                      makingEdit={this.props.makingEdit}
                      ingredient={ingredient}
                      updateDrinks={this.props.updateDrinks}
                      click_editField={this.props.click_editField}
                      click_cancelEditIngredientButton={this.props.click_cancelEditIngredientButton}
                      patch={this.props.patch}
                    />
                  </Segment>
                )
              })
            }

            {
              this.props.newIngredient &&
              <Segment>
                <NewIngredient
                  drinkId={this.props.drink.id}
                  post={this.props.post}
                  click_cancelNewIngredientButton={this.props.click_newIngredientButton}
                />
              </Segment>
            }

            {
              !this.props.makingEdit &&
              <Segment>{ newIngredientButton(this.props) }</Segment>
            }

          </Segment.Group>
        </Segment>

        <EditSteps
          steps={this.props.drink.steps}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />
      </Segment.Group>
    );
  }
}

function newIngredientButton(props) {
  return (
    <Button disabled={props.makingEdit} onClick={props.click_newIngredientButton}>
      Add Ingredient
    </Button>
  );
}


export default EditDrink
