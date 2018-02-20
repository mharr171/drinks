import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react'
import IngredientForm from './IngredientForm.jsx';

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
       ingredients: this.props.ingredients,
       newForm: false
    };

    this.showNewForm = this.showNewForm.bind(this);
    this.showButton = this.showButton.bind(this);
  }

  showNewForm () {
    this.setState({newForm: true});
  }

  showButton () {
    this.setState({newForm: false});
  }
  render () {
    let {ingredients} = this.state
    return (
      <div>
        {
          this.state.ingredients &&
          <Segment.Group>
            {Object.keys(ingredients).map((key) => {
              return <Segment key={key}>{ingredients[key].description}</Segment>
            })}
            <Segment>
              {
                this.state.newForm &&
                <IngredientForm
                  drinkId={this.props.drinkId}
                  postIngredient={this.props.postIngredient}
                />
              }

              {
                !this.state.newForm &&
                <Button onClick={this.showNewForm}>+</Button>
              }

            </Segment>
          </Segment.Group>
        }
      </div>
    );
  }
}

export default Ingredients
