import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react'
import Ingredients from './Ingredients.jsx';

class Drink extends Component {
  render () {
    return (
      <Container>
        {
          this.props.source && this.props.title &&
          <Header as='h2'><a href={this.props.source}>{this.props.title}</a></Header>
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
          />
        }

        {
          this.props.steps &&
          <p>{this.props.steps}</p>
        }
      </Container>
    );
  }
}

export default Drink
