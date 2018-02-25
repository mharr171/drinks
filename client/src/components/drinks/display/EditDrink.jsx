import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import EditTitle from '../form/EditTitle.jsx'
import EditSource from '../form/EditSource.jsx'
import EditIngredient from '../form/EditIngredient.jsx'
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
            {newIngredientButton(this.props)}
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
	if (!props.makingEdit){
    return (
      <Segment>
        <Button onClick={props.click_newIngredientButton}>
          Add Ingredient
        </Button>
      </Segment>
    );
  }
}


export default EditDrink
