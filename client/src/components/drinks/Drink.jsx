import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import Header from './Header.jsx';
import DrinkBar from './DrinkBar.jsx';
import Body from './Body.jsx';
import Navbar from './Navbar.jsx';

class Drink extends Component {
  constructor (props){
    super(props)
    this.state = {
      showDrink : false,
      newDrink : false,
      editDrink : false,
      makingEdit : false,
      newIngredient : false
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <Grid column={1}>
        <Grid.Row>
          <Header />
        </Grid.Row>

        <Grid.Row>
          <DrinkBar />
        </Grid.Row>

        <Grid.Row>
          <Body />
        </Grid.Row>

        <Grid.Row>
          <Navbar />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Drink
