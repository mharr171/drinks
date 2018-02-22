import React, { Component } from 'react';
import { Header, Icon, Button } from 'semantic-ui-react'

class DrinkList extends Component {
  constructor (props) {
    super(props)
    this.state= {}
  }

  render () {
    let {drinks, drink, editFormIsOpen} = this.props
    return (
      <div class="ui vertical segment">
        <Button.Group fluid widths={drinks.length}>
          {
            !editFormIsOpen &&
            Object.keys(drinks).map((key) => {
              return (
                <Button active={drink && drink.id === drinks[key].id} fluid key={key} onClick={() => this.props.getDrink(drinks[key].id)}>
                  {drinks[key].title}
                </Button>
              );
            })
          }
          {
            editFormIsOpen &&
            Object.keys(drinks).map((key) => {
              return (
                <Button active={drink && drink.id === drinks[key].id} fluid disabled key={key} onClick={() => this.props.getDrink(drinks[key].id)}>
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
