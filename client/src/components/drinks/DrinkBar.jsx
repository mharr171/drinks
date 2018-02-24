import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'

class DrinkBar extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    let {drinks} = this.props
    return (
      <Grid.Column>
        { Buttons(this.props) }
      </Grid.Column>
    );
  }
}

function Buttons(props) {
  if (props.showDrink){
    return (
      <Button.Group fluid widths={props.drinks.length}>
        {Object.keys(props.drinks).map((key) => {
          return (
            <Button active={props.drink && props.drink.id === props.drinks[key].id} fluid key={key} onClick={() => props.getDrink(props.drinks[key].id)}>
              {props.drinks[key].title}
            </Button>
          );
        })}
      </Button.Group>
    );
  }else {
    return (
      <Button.Group fluid widths={props.drinks.length}>
        {Object.keys(props.drinks).map((key) => {
          return (
            <Button active={props.drink && props.drink.id === props.drinks[key].id} fluid disabled key={key} onClick={() => props.getDrink(props.drinks[key].id)}>
              {props.drinks[key].title}
            </Button>
          );
        })}
      </Button.Group>
    );
  }


}

export default DrinkBar
