import React, { Component } from 'react';
import IngredientList from './IngredientList.jsx';

class Drink extends Component {
  constructor (props) {
    super(props)
    this.state= {}
  }

  render () {
    // Variables
    let {title, source, description, ingredients, steps} = this.props
    // Functions
    let {} = this.props
    return (
        <div class="ui segments">
          <div class="ui segment">
            {
              title &&
              <a href={source}>
                <h1>{title}</h1>
              </a>
            }
          </div>
          <div class="ui segment">
            {
              description &&
              <p>{description}</p>
            }
          </div>
          <div class="ui segment">
            <IngredientList
              ingredients={ingredients}
            />
          </div>
          <div class="ui segment">
            {
              steps &&
              <p>{steps}</p>
            }
          </div>
        </div>
    )
  }
}

export default Drink
