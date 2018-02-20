import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react'
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
              return <Segment key={key}>{this.props.ingredients[key].description}</Segment>
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
