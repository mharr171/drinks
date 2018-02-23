import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class DrinkList extends Component {
  constructor (props) {
    super(props)
    this.state= {}
  }

  render () {
    // Variables
    let {drinks, drink, editFormIsOpen} = this.props
    // Functions
    let {getDrinks, getDrink} = this.props
    return (
      <div className="ui vertical segment">
        <Button.Group fluid widths={drinks.length}>
        {
          Object.keys(drinks).map((key) => {
            return (
              <Button active={drink && drink.id === drinks[key].id} fluid disabled={editFormIsOpen} key={key} onClick={() => getDrink(drinks[key].id)}>
                {drinks[key].title}
              </Button>
            );
          })
        }
        </Button.Group>
      </div>
    )
  }
}

export default DrinkList
